import Schema from "@/model/model";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";

export async function GET(req) {
    try {
        const email = req.headers.get("email");
        if (!email) {
            return reject(
                NextResponse.json({ message: "Email is required" }, { status: 400 })
            );
        }
        await connectToDatabase();
        const user = await Schema.findOne({email})
        return NextResponse.json({
            message: "User fetched successfully",
            user: user
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { message: "Error uploading image", error: error.message },
            { status: 500 }
        );
    }
}