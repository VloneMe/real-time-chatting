import { NextRequest } from 'next/server';  

export interface NextRequestWithUser extends NextRequest {  
    user?: any;
}  