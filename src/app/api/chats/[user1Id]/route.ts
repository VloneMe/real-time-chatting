import Chat from "@/models/ChatModel";  
import { NextRequest, NextResponse } from "next/server";  

// Get chats for a specific user  
export async function GET(req: NextRequest, { params }: { params: { user1Id: string } }) {  
    try {  
        const { user1Id } = params;  

        // Check if user1Id is provided  
        if (!user1Id) {  
            return NextResponse.json({ success: false, error: "user1Id parameter is required" }, { status: 400 });  
        }  

        // Find chats where the user is a member  
        const chats = await Chat.find({ members: user1Id });  
        
        // Return the found chats  
        return NextResponse.json({ success: true, data: chats });  
    } catch (error) {  
        console.error("Error fetching chats:", error);  
        return NextResponse.json({ success: false, error: "An error occurred while fetching chats" }, { status: 500 });  
    }  
}