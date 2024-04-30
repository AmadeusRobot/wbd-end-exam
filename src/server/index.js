import 'module-alias/register.js'
import express from "express";
import { PORT } from "./config.js";

const app = express()

app.get("/", (_, res) => res.send("Hello"))

app.listen(PORT, () => {
    console.log("Server Listening on port:", PORT)
})