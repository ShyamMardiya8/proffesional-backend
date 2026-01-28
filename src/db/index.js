import mongoose from "mongoose";
import { DB_NAME } from "../constatnts.js";

const connectDB = async (params) => {
  try {
    const dbConnection = await mongoose.connect(
      `${process.env.MONGODB_URi}/${DB_NAME}`
    );
    console.log(`mongodb connected URI : ${dbConnection.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
