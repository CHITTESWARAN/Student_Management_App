import path from "path";
import fs from "fs";
import multer from "multer";

// Define the storage options for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = path.join(__dirname, 'uploads'); // Temp folder path
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true }); // Create folder if doesn't exist
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp for file name
  }
}); 

// Multer instance with the configuration
const upload = multer({ 
  storage: storage, 
  limits: { fileSize: 10 * 1024 * 1024 } // File size limit 10MB
}).single('profilePicture'); // 'profilePic' is the field name used for uploading file

export default upload;
