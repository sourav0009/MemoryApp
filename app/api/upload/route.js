// app/api/upload/route.js
import { NextResponse } from "next/server";
import cloudinary from "@/config/cloudinary";
import Schema from "@/model/model";
import { headers } from "next/headers";
import { connectToDatabase } from "@/lib/mongo";

export async function POST(req) {
  try {
    // Get email from headers
    const email = req.headers.get("email");
    if (!email) {
      return reject(
        NextResponse.json({ message: "Email is required" }, { status: 400 })
      );
    }
    
 
    
    // In Next.js App Router, we need to use the Request object differently
    const formData = await req.formData();
    const imageFile = formData.get("image");
    
    if (!imageFile) {
      return NextResponse.json({ message: "No image file uploaded" }, { status: 400 });
    }
    
    // Convert file to buffer and prepare for upload
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload to Cloudinary using buffer
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadOptions = {
        folder: "uploads",
        format: "png",
        public_id: `${Date.now()}-${imageFile.name}`,
      };
      
      cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }).end(buffer);
    });
    
    const uploadResult = await uploadPromise;
    await connectToDatabase();
    
    // Save the Cloudinary URL to the database
    const updatedUser = await Schema.findOneAndUpdate(
      { email },
      { $push: { images: uploadResult.secure_url } },
      { new: true }
    );
    
    return NextResponse.json({
      message: "Image uploaded successfully",
      imageUrl: uploadResult.secure_url,
      user: updatedUser
    });
    
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Error uploading image", error: error.message },
      { status: 500 }
    );
  }
}