import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    if (!process.env['MONGO_URI']) return;
    const { connection } = await mongoose.connect(process.env['MONGO_URI']);
    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}