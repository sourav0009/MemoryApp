import { NextResponse } from "next/server";
import Schema from "@/model/model";
import { connectToDatabase } from "@/lib/mongo";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await Schema.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Schema already exists" },
        { status: 409 }
      );
    }

    // ✅ Create new user
    const newUser = new Schema({ email, password });
    await newUser.save();

    // ✅ Create response
    const response = NextResponse.json(
      { message: "Schema registered successfully" },
      { status: 201 }
    );

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
