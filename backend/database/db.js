import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.MONGODB_URL);
        await mongoose.connect(process.env.ATLAS_URL);
        console.log("Database connected");
    } catch (error) {
        console.error("Error while connecting database:", error);
        process.exit(1);
    }
}
