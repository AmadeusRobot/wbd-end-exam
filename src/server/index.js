import "module-alias/register.js";
import compression from "compression";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { DB_URL, JWT_SECRET, PORT } from "./config.js";
import apiRouter from "./routes/index.js";
import { makeExecutableSchema } from '@graphql-tools/schema'
import { graphqlHTTP } from "express-graphql";
import typeDefs from "./typedefs.js";
import jwt from "jsonwebtoken"
import User from "./models/user.js";
import Session from "./models/session.js";
import { UserRoles } from "../utils/roles.js";

const app = express();

const data = {
    warriors: [
        { id: '001', name: 'Jaime' },
        { id: '002', name: 'Jorah' },
    ],
}

const resolvers = {
    Query: {
        users: async () => {
            try {
                const users = await User.find().populate("admin");
                return users
            } catch (err) {
                return { error: err.message }
            }
        },
        doctors: async () => {
            try {
                const users = await User.find({ role: UserRoles.doctor }).populate("admin");
                return users
            } catch (err) {
                return {
                    error: "Invalid Request"
                }
            }
        }
    },
    Mutation: {
        login: async (_, args) => {
            const { email, password } = args
            if (!password || !email) {
                return { error: "Bad Request" }
            }
            try {
                const user = await User.findOne({ email })
                if (user.password === password) {
                    const _session = {
                        user,
                        createdAt: Date.now()
                    }
                    const token = jwt.sign(_session, JWT_SECRET)
                    const session = new Session(_session)
                    session.set("token", token)
                    await session.save()
                    return session
                }
                return { error: "Incorrect password" }
            } catch (err) {
                return {
                    error: "Incorrect email"
                }
            }
        },
        register: async (_, args) => {
            try {
                const user = await User.create(args);
                const _session = {
                    user,
                    createdAt: Date.now()
                }
                const token = jwt.sign(_session, JWT_SECRET)
                const session = new Session(_session)
                session.set("token", token)
                await session.save()
                return session
            } catch (err) {
                return { error: "Bad Request" }
            }
        },
        deleteUser: async (_, args) => {
            try {
                const user = await User.findByIdAndDelete(args.id);
                if (!user) {
                    return "User not found"
                }
                return "Success"
            } catch (err) {
                return "Bad Request"
            }
        },
        updateUser: async (_, args) => {
            try {
                const id = args.id
                delete args.id
                const user = await User.findByIdAndUpdate(id, args);
                if (!user) {
                    return "User not found"
                }
                return "Success"
            } catch (err) {
                return "Bad Request"
            }
        }
    }
}

const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/api", apiRouter);
app.use(
    '/graphql',
    graphqlHTTP((req, res) => ({
        schema: executableSchema,
        context: {
            req,
            res
        },
        graphiql: true,
    }))
)
app.use("/static/files", express.static(join(__dirname, "..", "..", "public")));

mongoose
    .connect(DB_URL)
    .then(() => {
        console.log("Connected to database");
        app.listen(PORT, () => {
            console.log("Server Listening on port:", PORT);
        });
    })
    .catch(console.log);
