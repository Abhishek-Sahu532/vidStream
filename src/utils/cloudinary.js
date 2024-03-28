import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'



cloudinary.config({ 
  cloud_name: 'dqcgmfiig', //CLOUDINARY_NAME - FOR ENV
  api_key: '834294333575452', //CLOUDINARY_API_KEY
  api_secret: '5D-Nd3I6qVnXeVcbx928O8oaH2g' //CLOUDINARY_API_SECRET
});



const uploadOnCloudinary = async (path)=>{
try {
    if(!path){
        return null
    }
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(path, {
        resource_type : "auto"
    })
    //file has been uploaded successfully
    console.log('File is uploaded on cloudinary')
    return response
} catch (error) {
    fs.unlinkSync(path) //remove the locally saved temp file as the upload operation got failed
}
}

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });