import { NextResponse } from 'next/server';  
import { jwtVerify } from 'jose';  
import { NextRequestWithUser } from './types/next'; // Make sure the path matches your structure  

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");  

export async function middleware(req: NextRequestWithUser) {  
    const token = req.headers.get('Authorization');

    if (!token) {  
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });  
    }  

    try {  
        const { payload } = await jwtVerify(token, JWT_SECRET);  
        req.user = payload; // This will be recognized now  
    } catch (err) {  
        console.error('Token verification failed:', err);  
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });  
    }  

    return NextResponse.next();  
}  

// Export your config if needed  
export const config = {  
    matcher: ['/api/users', '/api/chats', '/api/messages'],  
};