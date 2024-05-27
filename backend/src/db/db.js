import mongoose from "mongoose";
import { DB_NAME } from '../constants.js'


const connectDB = async () =>{
    try {
        let DbInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Database Connection: ${DbInstance.connection.host}`)
  console.log('from the try block',   process.env.MONGODB_URI)
    } catch (error) {
         console.log('from the catch block',   process.env.MONGODB_URI)
        console.log('MongoDB conntection failed', error);
        process.exit(1)
    }
}


export default connectDB
