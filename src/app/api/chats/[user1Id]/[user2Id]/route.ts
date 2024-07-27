import Chat from "@/models/ChatModel";  
import { NextRequest, NextResponse } from "next/server";  

// Get chats for two specific users  
export async function GET(req: NextRequest, { params }: { params: { user1Id: string, user2Id: string } }) {  
    try {  
        const { user1Id, user2Id } = params;  

        // Check if both user IDs are provided  
        if (!user1Id || !user2Id) {  
            return NextResponse.json({ success: false, error: "Both user1Id and user2Id parameters are required" }, { status: 400 });  
        }  

        // Find chats where both users are members  
        const chats = await Chat.find({ members: { $all: [user1Id, user2Id] } });  
        
        // Return the found chats  
        return NextResponse.json({ success: true, data: chats });  
    } catch (error) {  
        console.error("Error fetching chats:", error);  
        return NextResponse.json({ success: false, error: "An error occurred while fetching chats" }, { status: 500 });  
    }  
} 