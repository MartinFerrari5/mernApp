import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const uri= process.env.MONGODB_URI

export const connectDb = async () =>{
  try {
    await mongoose.connect(uri)
  } catch (error) {
    console.log("Connection failed")
  }
}
