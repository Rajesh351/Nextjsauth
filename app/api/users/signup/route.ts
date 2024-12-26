import { NextResponse, NextRequest } from "next/server";
import { connect } from "../../../../database/db-connection";
import User from "@/models/usermode";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { username, email, password } = body;

    // Validate fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields (username, email, password) are required." },
        { status: 400 }
      );
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 400 }
      );
    }

    // Hash password and create user
    const hashedPassword = await bcryptjs.hash(password, 10);
    user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error processing request:", err.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
