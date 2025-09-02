import mongoose from "mongoose";

const dbConnection = async () => {
  console.log("🟡 Connecting to MongoDB...");
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connection successful!");
  } catch (err) {
    console.log("MongoDB connection failed:", err);
  }
};

export default dbConnection;
