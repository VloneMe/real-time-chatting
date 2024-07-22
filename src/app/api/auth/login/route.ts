import dbConnect from "@/lib/dbConnect";  
import User from "@/models/User";  
import { NextRequest, NextResponse } from "next/server";  
import { compareSync } from "bcrypt-ts";  
import jwt from "jsonwebtoken";  

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";   

 
interface LoginRequestBody {  
    email: string;  
    password: string;  
}  

// login Api  
export async function POST(req: NextRequest) {  
    try {  
        await dbConnect();  

        const body: LoginRequestBody = await req.json();  
        const { email, password } = body;  

        if (!email || !password) {  
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });  
        }  

        const user = await User.findOne({ email });  
        if (!user) {  
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });  
        }  

        try {  
            const isPasswordValid = compareSync(password, user.password);  
            if (!isPasswordValid) {  
                return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });  
            }  
        } catch (error) {  
            console.error("Error comparing passwords:", error);  
            return NextResponse.json({ message: "Error validating password" }, { status: 500 });  
        }  

        const token = jwt.sign({ userId: user._id, username: user.username, fname: user.fname, email: user.email }, JWT_SECRET, { expiresIn: "1h" });  

        return NextResponse.json({ message: "Login successful", token }, { status: 200 });  
    } catch (error) {  
        console.error("Error handling request:", error);  
        return NextResponse.json({ message: "Error handling request" }, { status: 500 });  
    }  
}