import Message from "@/models/MessageModal";  
import { NextRequest, NextResponse } from "next/server";  

// GET method to fetch messages based on chatId  
export async function GET(req: NextRequest, { params }: { params: { chatId: string } }) {  
    try {   
        const { chatId } = params;  

        // Validate chatId  
        if (!chatId) {  
            return NextResponse.json(  
                { message: "Missing chatId" },  
                { status: 400 }  
            );  
        }  

        // Fetch messages from the database based on chatId, sorted by createdAt  
        const messages = await Message.find({ chatId }).sort({ createdAt: 1 }).select('text senderId createdAt').exec();  

        return NextResponse.json(messages, { status: 200 });  
    } catch (error) {  
        console.error("Error fetching messages:", error);  
        return NextResponse.json(  
            { message: "Internal Server Error" },  
            { status: 500 }  
        );  
    }  
}  

// DELETE method to remove a message based on messageId  
export async function DELETE(req: NextRequest, { params }: { params: { chatId: string } }) {  
    try {  
        const { chatId } = params;  

        // Validate chatId  
        if (!chatId) {  
            return NextResponse.json(  
                { message: "Missing chatId" },  
                { status: 400 }  
            );  
        }  

        // Delete the message from the database  
        const deletedMessage = await Message.findByIdAndDelete(chatId);  

        // Check if the message was found and deleted  
        if (!deletedMessage) {  
            return NextResponse.json(  
                { message: "Message not found" },  
                { status: 404 }  
            );  
        }  

        return NextResponse.json(  
            { message: "Message deleted successfully" },  
            { status: 200 }  
        );  
    } catch (error) {  
        console.error("Error deleting message:", error);  
        return NextResponse.json(  
            { message: "Internal Server Error" },  
            { status: 500 }  
        );  
    }  
}