import { config } from "dotenv";

config()

export const DB_URL = process.env.DB_URL || "=>"

export const PORT = process.env.PORT || 8080