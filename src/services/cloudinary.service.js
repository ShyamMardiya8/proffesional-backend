import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadFileCloudinary = async (fileUploadPath) => {
  try {
    if (!fileUploadPath) return null;
    const response = await cloudinary.uploader.upload(fileUploadPath, {
      resource_type: "auto",
    });
    console.log("cloudinary file uploaded successfully", response);
    fs.unlinkSync(fileUploadPath);
    return response;
  } catch (error) {
    fs.unlinkSync(fileUploadPath);
    return null;
  }
};

export { uploadFileCloudinary };
