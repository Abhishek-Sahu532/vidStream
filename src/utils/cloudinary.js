import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dqcgmfiig", //CLOUDINARY_NAME - FOR ENV
  api_key: "834294333575452", //CLOUDINARY_API_KEY
  api_secret: "5D-Nd3I6qVnXeVcbx928O8oaH2g", //CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (path) => {
  try {
    if (!path) {
      return null;
    }
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(path, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    // console.log("File is uploaded on cloudinary");
    fs.unlinkSync(path) //deleting file after uploading on cloudinary
    return response;
  } catch (error) {
    fs.unlinkSync(path); //remove the locally saved temp file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
