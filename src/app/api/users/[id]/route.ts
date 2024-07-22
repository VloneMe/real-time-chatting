// app/api/users/[id].ts 

import dbConnect from "@/lib/dbConnect";  
import User from "@/models/User";  
import { NextRequest, NextResponse } from "next/server";  
import { genSaltSync, hashSync } from "bcrypt-ts";  
import validator from "validator";  

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {  
    const { id } = params;  

    try {  
        await dbConnect();  

        if (!id) {  
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });  
        }  

        const user = await User.findById(id);  

        if (!user) {  
            return NextResponse.json({ message: "User not found" }, { status: 404 });  
        }  

        return NextResponse.json({ user }, { status: 200 });  
    } catch (error: unknown) {  
        if (error instanceof Error) {  
            console.error("Error fetching user:", error.message);  
            return NextResponse.json({ message: "Error fetching user" }, { status: 500 });  
        } else {  
            console.error("Unknown error:", error);  
            return NextResponse.json({ message: "Unknown error occurred" }, { status: 500 });  
        }  
    }  
} 

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {  
    const { id } = params; // Get user ID from params  

    try {  
        await dbConnect();  

        const body = await req.json();  
        const { username, fname, email, password } = body;  

        if (!id || !fname || !email) {  
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });  
        }  

        if (email && !validator.isEmail(email)) {  
            return NextResponse.json({ message: "Invalid email format" }, { status: 400 });  
        }  

        const user = await User.findById(id);  
        if (!user) {  
            return NextResponse.json({ message: "User not found" }, { status: 404 });  
        }  

        user.username = username || user.username;  
        user.fname = fname || user.fname;  
        user.email = email || user.email;  

        if (password) {  
            if (!validator.isStrongPassword(password, { minLength: 8 })) {  
                return NextResponse.json({ message: "Password is not strong enough" }, { status: 400 });  
            }  
            const salt = genSaltSync(10);  
            user.password = hashSync(password, salt);  
        }  

        await user.save();  

        return NextResponse.json({ message: "User updated successfully", user }, { status: 200 });  
    } catch (error: unknown) {  
        if (error instanceof Error) {  
            console.error("Error updating user:", error.message);  
            return NextResponse.json({ message: "Error updating user" }, { status: 500 });  
        } else {  
            console.error("Unknown error:", error);  
            return NextResponse.json({ message: "Unknown error occurred" }, { status: 500 });  
        }  
    }  
}  

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {  
    const { id } = params; // Get user ID from params  

    try {  
        await dbConnect();  

        if (!id) {  
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });  
        }  

        const user = await User.findByIdAndDelete(id);  
        if (!user) {  
            return NextResponse.json({ message: "User not found" }, { status: 404 });  
        }  

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });  
    } catch (error: unknown) {  
        if (error instanceof Error) {  
            console.error("Error deleting user:", error.message);  
            return NextResponse.json({ message: "Error deleting user" }, { status: 500 });  
        } else {  
            console.error("Unknown error:", error);  
            return NextResponse.json({ message: "Unknown error occurred" }, { status: 500 });  
        }  
    }  
}