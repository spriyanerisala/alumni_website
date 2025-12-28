import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
   const conn = await mongoose.connect(process.env.MONGODB_URL)
   console.log('MongoDB connected')
    }catch(err){
        console.log('mongodb not connected',err)
    }
}

export default connectDB