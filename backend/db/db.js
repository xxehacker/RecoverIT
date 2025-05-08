import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    let dburl = `${process.env.MONGODB_URI}/${DB_NAME}`;
    const connectionInstance = await mongoose.connect(dburl);
    console.log("MongoDB Connected", connectionInstance.connection.host);
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
