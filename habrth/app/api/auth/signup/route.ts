import { connectToMongoDb } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    await connectToMongoDb();

    const { name, email, password, dob } = await request.json();
    const jwtSecret = process.env.JWT_SECRET;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required" },
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
    const normalizedName = String(name).trim();
    const normalizedDob = dob ? new Date(dob) : undefined;

    if (dob && Number.isNaN(normalizedDob?.getTime())) {
      return NextResponse.json(
        { success: false, message: "Date of birth is invalid" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User with this email already exists",
        },
        { status: 400 },
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name: normalizedName,
      email: normalizedEmail,
      dob: normalizedDob,
      password: hashedPassword,
    });

    await newUser.save();

    const safeUser = newUser.toObject() as Record<string, unknown>;
    delete safeUser.password;

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, jwtSecret, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      { success: true, user: safeUser },
      { status: 201 },
    );

    response.cookies.set({
      name: "authToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "User with this email already exists",
        },
        { status: 400 },
      );
    }

    console.error("Error during signup:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during signup",
      },
      { status: 500 },
    );
  }
}
