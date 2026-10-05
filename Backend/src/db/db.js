import mongoose from 'mongoose';

mongoose.set("sanitizeFilter", true);
mongoose.set("strictQuery", true);

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Connected')
    } catch (error) {
        console.error("Error connecting to MongoDB")
        throw error;
    }
}

export default connectDB;
