// types.ts  

export interface User {  
    userId: string;  
    username: string;  
  }  
  
  export interface Chat {  
    _id: string;  
    members: string[];  
    // Add other fields as necessary  
  }  
  
  export interface Message {  
    _id: string;  
    senderId: string;  
    chatId: string;  
    content: string;  
    createdAt: string;  
    // Add other fields as necessary  
  }