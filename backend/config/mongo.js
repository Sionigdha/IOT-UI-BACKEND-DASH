import mongoose from "mongoose";

export async function connectMongo() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/iot_platform");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}
