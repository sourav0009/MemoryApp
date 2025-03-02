import { NextResponse } from "next/server";
import Schema from "@/model/model";
import { connectToDatabase } from "@/lib/mongo";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectToDatabase();
    const user = await Schema.findOne({ email });

    if (!user || user.password !== password) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // ✅ Create response
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}