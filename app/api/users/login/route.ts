import { NextResponse, NextRequest } from "next/server";
import { connect } from "../../../../database/db-connection";
import User from "@/models/usermode";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Establish database connection
connect();

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { email, password } = body;

    // Validate fields
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Generate JWT
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Success response
    const response = NextResponse.json(
      {
        message: `Welcome back, ${user.username}!`,
        success: true,
      },
      { status: 200 }
    );

    // Set the token as a secure, HTTP-only cookie
    response.cookies.set("token", token, { httpOnly: true, });
    return response;
  } catch (_err) {
    return NextResponse.json(
      { message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
