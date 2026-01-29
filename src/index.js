import app from "./app.js";
import { PORT } from "./constatnts.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch(() => console.log("Mongodb connection failed"));
