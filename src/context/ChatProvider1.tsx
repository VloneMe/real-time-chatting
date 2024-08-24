"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';  

interface User {  
  userId: string;  
  username: string;  
  // Add other user fields as necessary  
}  

interface Chat {  
  _id: string;  
  members: string[];  
  // Add other chat fields as necessary  
}  

interface ChatContextType {  
  token: string;  
  user: User | null;  
  chats: Chat[];  
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;  
  messages: any[]; // Define a proper message type based on your application data structure  
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;  
  setUser: React.Dispatch<React.SetStateAction<User | null>>;  
  setToken: React.Dispatch<React.SetStateAction<string>>;  
}  

const ChatContext = createContext<ChatContextType | undefined>(undefined);  

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {  
  const [token, setToken] = useState<string>('');  
  const [user, setUser] = useState<User | null>(null);  
  const [chats, setChats] = useState<Chat[]>([]);  
  const [messages, setMessages] = useState<any[]>([]);  

  const value: ChatContextType = {  
    token,  
    user,  
    chats,  
    setChats,  
    messages,  
    setMessages,  
    setUser,  
    setToken,  
  };  

  return (  
    <ChatContext.Provider value={value}>  
      {children}  
    </ChatContext.Provider>  
  );  
};  

export const useChatContext = () => {  
  const context = useContext(ChatContext);  
  if (!context) {  
    throw new Error('useChatContext must be used within a ChatProvider');  
  }  
  return context;  
};