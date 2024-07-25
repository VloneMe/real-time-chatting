import dbConnect from "@/lib/dbConnect";  
import User from "@/models/User";  
import { NextRequest, NextResponse } from "next/server";  

export async function GET() {  
    try {  
        await dbConnect();  

        // Fetch all users but exclude the password field  
        const users = await User.find({}).select('-password'); // Exclude password  

        return NextResponse.json(users, { status: 200 });  
    } catch (error: unknown) {  
        if (error instanceof Error) {  
            console.error("Error fetching users:", error.message);  
            return NextResponse.json({ message: "Error fetching users" }, { status: 500 });  
        } else {  
            console.error("Unknown error:", error);  
            return NextResponse.json({ message: "Unknown error occurred" }, { status: 500 });  
        }  
    }  
}