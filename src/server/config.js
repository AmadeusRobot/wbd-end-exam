import { config } from "dotenv";
import mongoose from "mongoose";

config();

export const DB = process.env.DB_URL || "=>";

export const PORT = process.env.PORT || 8080;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
