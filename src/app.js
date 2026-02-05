import express from "express";
import cors from "cors";
import { CORS_OPTIONS } from "./constatnts.js";
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(cors(CORS_OPTIONS));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// import routers

import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";

app.use("/api/v1", userRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.info("🚀 ~ err:", err);
  return res.status(statusCode).json({
    success: false,
    message: err.message,
    errors: err.errors || [],
  });
});
export default app;
