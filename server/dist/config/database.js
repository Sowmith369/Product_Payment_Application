import { error } from "console";
import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};
export default connectDB;
