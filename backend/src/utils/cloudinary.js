import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINERY_CLOUD_NAME,
  api_key: process.env.CLOUDINERY_API_KEY,
  api_secret: process.env.CLOUDINERY_API_SECRET,
});

const uploadOnCloudinary = async (path) => {
  try {

    if (!path) {
      return null;
    }
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(path, {
      resource_type: "auto"
    });
    //file has been uploaded successfully
    // console.log("File is uploaded on cloudinary");
    fs.unlinkSync(path); //deleting file after uploading on cloudinary
    return response;
  } catch (error) {
    fs.unlinkSync(path); //remove the locally saved temp file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
