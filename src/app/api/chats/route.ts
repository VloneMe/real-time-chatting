import Chat from "@/models/ChatModel";  
import { NextRequest, NextResponse } from "next/server";  

// Define a type for the request body  
interface CreateChatRequest {  
    user1Id: string;  
    user2Id: string;  
}  

// Create chat  
export async function POST(req: NextRequest) {  
    try {  
        const body: CreateChatRequest = await req.json();  
        const { user1Id, user2Id } = body;  

        // Validate both IDs are provided  
        if (!user1Id || !user2Id) {  
            return NextResponse.json({ success: false, error: "Both user IDs are required" }, { status: 400 });  
        }  

        // Create new chat  
        const newChat = await Chat.create({ members: [user1Id, user2Id] });  
        return NextResponse.json({ success: true, data: newChat }, { status: 201 });  
    } catch (error) {  
        console.error("Error creating chat:", error);  
        return NextResponse.json({ success: false, error: "An error occurred while creating the chat" }, { status: 500 });  
    }  
}  

// Get all chats  
export async function GET() {  
    try {  
        const chats = await Chat.find();  
        return NextResponse.json({ success: true, data: chats });  
    } catch (error) {  
        console.error("Error fetching chats:", error);  
        return NextResponse.json({ success: false, error: "An error occurred while fetching chats" }, { status: 500 });  
    }  
}