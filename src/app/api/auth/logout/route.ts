import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import validator from "validator";


// Logout API
export async function POST(req: NextRequest) {
    try {
        // Invalidate the token (client-side responsibility)
        // Here, we simply return a success message
        return NextResponse.json({ message: "Logout successful" }, { status: 200 });
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