import { connectToMongoDb } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    await connectToMongoDb();

    const { email, password } = await request.json();
    const jwtSecret = process.env.JWT_SECRET;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 },
      );
    }

    if (!jwtSecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error: JWT secret is missing",
        },
        { status: 500 },
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    // Find user by email
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    const safeUser = user.toObject() as Record<string, unknown>;
    delete safeUser.password;

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      { success: true, user: safeUser },
      { status: 200 },
    );
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login",
      },
      { status: 500 },
    );
  }
}
