import "module-alias/register.js";
import express from "express";
import { DB_URL, PORT } from "./config.js";
import apiRouter from "./routes/index.js";
import cors from "cors"
import compression from "compression";
import mongoose from "mongoose";

const app = express();

app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", apiRouter)

mongoose.connect(DB_URL)
.then(() => {
    console.log("Connected to database")
    app.listen(PORT, () => {
        console.log("Server Listening on port:", PORT);
    });
})
.catch(console.log)