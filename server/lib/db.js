import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    
    const conn = await mongoose.connect(process.env.MONGODB_URL);

    console.log(`Mongodb connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Mongodb connection error: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
