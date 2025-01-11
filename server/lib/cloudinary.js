import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();

try {
  cloudinary.config({
    
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_PI_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  console.log("Cloudinary connected successfully");
} catch (error) {
  console.error("Error connecting to Cloudinary:", error.message);
  process.exit(1);  // Exit process if Cloudinary connection fails
}

export default cloudinary;
