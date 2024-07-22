import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import validator from "validator";


// Register Api
export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();
        const { username, fname, email, password } = body;

        if (!fname || !email || !password) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        if (!validator.isEmail(email)) {
            return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
        }

        if (!validator.isStrongPassword(password, { minLength: 8 })) {
            return NextResponse.json({ message: "Password is not strong enough" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const salt = genSaltSync(10);
        const hashedPassword = hashSync(password, salt);

        const newUser = new User({ username, fname, email, password: hashedPassword });

        await newUser.save();

        return NextResponse.json({ message: "User registered successfully", user: newUser }, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error handling request:", error.message);
            return NextResponse.json({ message: "Error handling request" }, { status: 500 });
        } else {
            console.error("Unknown error:", error);
            return NextResponse.json({ message: "Unknown error occurred" }, { status: 500 });
        }
    }
}