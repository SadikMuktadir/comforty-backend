import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';

dotenv.config();

// Proper async function that returns Cloudinary upload result
export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
): Promise<{ secure_url: string }> => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    });

    // Delete local file after upload
    fs.unlink(path, (err) => {
      if (err) console.error('Failed to delete local file:', err);
    });

    // Return Cloudinary URL
    return { secure_url: uploadResult.secure_url };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error; // propagate the error
  }
};

// multer setup
const storage = multer.diskStorage({
  destination: '/tmp',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

export const upload = multer({ storage });
