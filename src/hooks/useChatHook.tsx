import { useEffect, useState, useCallback } from 'react';  
import { useChatContext } from '../context/ChatProvider1'; // Update this path as necessary  
import { User, Chat, Message } from '../types/types'; // Update with your actual types  

// const Message = { /* Define your message type here */ };  

export const useChatHook = () => {  
  const { token, user, chats, setChats } = useChatContext();  

  const [currentChat, setCurrentChat] = useState<Chat | null>(null);  
  const [potentialChats, setPotentialChats] = useState<User[]>([]);  
  const [error, setError] = useState<string | null>(null);  
  const [messages, setMessages] = useState<Message[]>([]);  
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);  

  useEffect(() => {  
    const fetchUsers = async () => {  
      if (!token) return;  

      try {  
        const res = await fetch('/api/users', {  
          headers: { Authorization: `${token}` },  
        });  

        if (!res.ok) throw new Error("Failed to fetch users");  

        const users: User[] = await res.json();  
        if (!Array.isArray(users)) throw new Error("Expected users to be an array");  

        const filteredUsers = users.filter((u) =>   
          u.userId !== user?.userId && !chats.some(chat => chat.members.includes(u.userId))  
        );  

        setPotentialChats(filteredUsers);  
      } catch (err) {  
        setError(err instanceof Error ? err.message : 'An error occurred while fetching users');  
      }  
    };  

    fetchUsers();  
  }, [token, user?.userId, chats]);  

  const updateCurrentChat = useCallback((chat: Chat) => {  
    setCurrentChat(chat);  
  }, []);  

  const createChat = useCallback(async (user1Id: string, user2Id: string) => {  
    if (!token) return;  

    try {  
      const res = await fetch('/api/chats/', {  
        method: 'POST',  
        headers: {  
          Authorization: `${token}`,  
          'Content-Type': 'application/json',  
        },  
        body: JSON.stringify({ user1Id, user2Id }),  
      });  

      if (!res.ok) throw new Error("Error creating chat");  

      const newChat: Chat = await res.json();  
      setChats((prev) => [...prev, newChat]);  
    } catch (error) {  
      console.error("Error creating chat:", error);  
    }  
  }, [token, setChats]);  

  const fetchMessages = useCallback(async () => {  
    if (!currentChat?._id || !token) return;  

    setLoadingMessages(true);  
    try {  
      const chatId = currentChat._id;  
      const res = await fetch(`/api/messages/${chatId}`, {  
        headers: { Authorization: `${token}` }  
      });  

      if (!res.ok) throw new Error('Failed to fetch messages');  

      const data: Message[] = await res.json();  
      setMessages(data);  
    } catch (err) {  
      setError(err instanceof Error ? err.message : 'An error occurred while fetching messages');  
    } finally {  
      setLoadingMessages(false);  
    }  
  }, [currentChat, token]);  

  useEffect(() => {  
    fetchMessages();  
  }, [fetchMessages]);  

  return {  
    potentialChats,  
    updateCurrentChat,  
    createChat,  
    messages,  
    loadingMessages,  
    error  
  };  
};