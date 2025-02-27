import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL)
    console.log("MongoDB connected Succesfully");
  } catch (error) {
    console.log("error: ", error.message);
    process.exit(1);
  }
};

export default connectDB;