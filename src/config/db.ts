import mongoose from "mongoose";
import { config } from "./index";

export const connectDb = async () => {
  try {
    if (!config.mongoUri) {
      throw new Error("MongoDB URI is not defined");
    }
    await mongoose.connect(config.mongoUri);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
