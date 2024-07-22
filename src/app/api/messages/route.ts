import dbConnect from "@/lib/dbConnect";
import Message from "@/models/MessageModal"; 
import { NextRequest, NextResponse } from "next/server";  

// Create Messages  
export async function POST(req: NextRequest, res: NextResponse) {  
    try {
        await dbConnect();
        
        const body = await req.json();  
        const { chatId, senderId, text } = body;  

        // Input validation  
        if (!chatId || !senderId || !text) {  
            return NextResponse.json(  
                { message: "Missing required fields" },  
                { status: 400 }  
            );  
        }  

        // Create a new message instance  
        const newMessage = new Message({  
            chatId,  
            senderId,  
            text,  
            createdAt: new Date()  
        });  

        // Save the message to the database  
        await newMessage.save();  

        return NextResponse.json(newMessage, { status: 201 });
    } catch (error) {  
        console.error("Error creating message:", error);  
        return NextResponse.json(  
            { message: "Internal Server Error" },  
            { status: 500 }  
        );  
    }  
}

export async function GET(req: NextRequest) {  
    try {   
        await dbConnect();  

        // Fetch all messages from the database, sorted by createdAt  
        const messages = await Message.find().sort({ createdAt: 1 }).exec();  

        // Return messages with a structured response  
        return NextResponse.json({  
            success: true,  
            data: messages,  
            count: messages.length,  
        }, { status: 200 });  
    } catch (error) {  
        console.error("Error fetching messages:", error);  
        return NextResponse.json(  
            { message: "Internal Server Error" },  
            { status: 500 }  
        );  
    }  
}