import "module-alias/register.js";
import compression from "compression";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { DB_URL, PORT } from "./config.js";
import apiRouter from "./routes/index.js";

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/api", apiRouter);
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
