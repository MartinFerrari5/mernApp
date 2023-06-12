import {v2 as cloudinary} from "cloudinary"
cloudinary.config({ 
    cloud_name: 'de2cvcln2', 
    api_key: '285992115558926', 
    api_secret: '1QLcjPiWBEQJYWgICFOV6IJFsNE' 
  });
export const uploadImage= async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: "posts"
    })
}

export const deleteImage = async (id) =>{
    return await cloudinary.uploader.destroy(id)
}