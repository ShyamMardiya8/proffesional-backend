import express from "express";
import cors from "cors";
import { CORS_OPTIONS } from "./constatnts.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(cors(CORS_OPTIONS));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

export default app;
