import { Router } from "express";
import { Post } from "../mongoose/mongoose.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
const router = Router();

// OBTENER LOS POSTS
router.get("/api", async (req, res) => {
  try {
    res.send(await Post.find({}));
  } catch (error) {
    // 500 -> error de servidor
    return res.status(500).json({ message: error.message });
  }
});

// GUARDAR UN POST
router.post("/", async (req, res) => {
 
  try {
    const { title, content } = req.body;
    let imagen;
    
    if( req.files){
      const result = await uploadImage( req.files.image.tempFilePath)
      console.log(result)
      imagen = {
        url: result.secure_url,
        public_id: result.public_id
      }
      await fs.remove(req.files.image.tempFilePath)
    }
    const item = new Post({
      title: title,
      content: content,
      image: imagen,
    });
    return res.json(await item.save());    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// OBTAIN A PARTICULAR POST BY ITS ID
router.get("/post/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const old = await Post.findById(id);
    return res.json(old);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// UPDATE A POST
router.put("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletingImage = await Post.findById(id)
    let imagen;
    let newData= {...req.body,
    image:deletingImage.image};
    
    
    if( req.files){
     
       await deleteImage(deletingImage.image.public_id);
      
      const result = await uploadImage( req.files.image.tempFilePath)
      console.log(result)
      imagen = {
        url: result.secure_url,
        public_id: result.public_id
      }
      newData = {
        ...newData,
        image: imagen
      }
      await fs.remove(req.files.image.tempFilePath)
    }
    
 
    const updatedPost = await Post.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return res.json(updatedPost)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// DELETE A POST
router.delete("/delete/:id", async (req, res) => {
  
  try {
    
    const  idPost  = req.params.id;
    const deletedPost = await Post.findOneAndDelete({ _id: idPost });
    if (!deletedPost) return res.sendStatus(404);

    if (deletedPost.image.public_id) {
      await deleteImage(deletedPost.image.public_id);
    }

    return res.json(deletedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
