import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import "dotenv/config";

// Cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        const uploadResult = await cloudinary.uploader.upload(
            localFilePath, 
            {
                resource_type: "auto"
            }
        )
        console.log(`File url ${uploadResult.url}`);
        fs.unlinkSync(localFilePath);
        return uploadResult;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
};