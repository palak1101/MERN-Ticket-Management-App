import mongoose from "mongoose";

const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://Admin:Admin@cloudfsd.yqyt9qz.mongodb.net/ticketingSystem?retryWrites=true&w=majority&appName=Cloudfsd')
}

export default connectDB 
