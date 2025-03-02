import cloudinary from "@/config/cloudinary";
import { NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const uploadToCloudinary = async (file) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "uploads",
          format: "png",
          public_id: `${Date.now()}-${file.originalFilename}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      const readStream = fs.createReadStream(file.filepath);
      readStream.pipe(uploadStream);
    });
  } catch (error) {
    throw new Error(`Failed to upload to Cloudinary: ${error.message}`);
  }
};

export const parseForm = async (req) => {
  const form = new IncomingForm();
  
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};