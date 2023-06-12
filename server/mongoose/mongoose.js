// MONGOOSE
import mongoose from "mongoose";
import { Schema } from "mongoose";


const postSchema = new Schema({
  title:{
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    url: String,
    public_id: String
  }
})
const Post = mongoose.model('posts',postSchema)
export {Post}