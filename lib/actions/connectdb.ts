import mongoose from 'mongoose'
let isConnected = false;
export const connectdb = async()=>{
 // Set strict query mode for Mongoose to prevent unknown field queries.
 mongoose.set("strictQuery", true);
  
    if(process.env.NEXT_PUBLIC_MONGODB_URL === undefined) return console.log('mongodb url not found')
    if(isConnected) return console.log("already connected to mongodb")


    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL)
        isConnected = true;
        console.log('connected to mongodb')
    } catch (error) {
        console.log('error in connecting db', error)
    }

}