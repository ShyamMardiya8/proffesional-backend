import dotenv from "dotenv";

dotenv.config();

export const DB_NAME = "videotube";

export const CORS_OPTIONS = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

export const PORT = process.env.PORT;
