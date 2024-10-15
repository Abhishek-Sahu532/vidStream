import { v2 as cloudinary } from "cloudinary";

// Function to delete file from Cloudinary using public ID
export const deleteFromCloudinary = async (publicId) => {
  try {
    // Delete the file using its public ID
    const result = await cloudinary.uploader.destroy(publicId);

    // Check the result and handle accordingly
    if (result.result === "ok") {
      console.log(`File with public ID ${publicId} deleted from Cloudinary`);
      return true; // or you can return some success indicator
    } 
    // else {
    //   throw new Error("Failed to delete file from Cloudinary");
    // }
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw error; // or handle the error as needed in your application
  }
};
