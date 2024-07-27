import { useAuth } from '@/context/AuthContext';  
import { useCallback, useEffect, useState } from 'react';  
import { useChats } from './useChats';  

interface User {
  members: any;  
  username: string;  
  fname: string;  
  _id: string;  
}  

export const useRecipientUser = (recipientIds: string[]) => {  
  const [recipientUsers, setRecipientUsers] = useState<User[]>([]); 
  const [currentChat, setCurrentChat] = useState(null); 
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);  
  const [potentialChats, setPotentialChats] = useState<User[]>([]);  
  const { user } = useAuth();
  
  const {chats, setChats } = useChats()
  
  const token = localStorage.getItem('token');  

  console.log("Show current Chat: ", currentChat);

  useEffect(() => {  
    const fetchUsers = async () => {  
      if (!token) return;  

      try {  
        const res = await fetch('/api/users', {  
          headers: {  
            "Authorization": `${token}`  
          }  
        });  

        if (!res.ok) {  
          throw new Error("Failed to fetch users");  
        }  

        const users = await res.json();  
        if (!Array.isArray(users)) {  
          throw new Error("Expected users to be an array");  
        }  

        const filteredUsers = users.filter((u: User) => {  
          return u._id !== user?.userId && !chats?.some((chat: any) => chat.members.includes(u._id));  
        });

        setPotentialChats(filteredUsers);  
      } catch (err) {  
        setError(err instanceof Error ? err.message : 'An error occurred while fetching users');  
      }  
    };  

    fetchUsers();  
  }, [token, user?.userId, chats]);
  
  const updateCurrentChat = useCallback((chat: any) => {
    setCurrentChat(chat)
  }, [])

  const createChat = useCallback(async (user1Id: string, user2Id: string) => {  
    if (!token) return;  

    try {  
      const res = await fetch('/api/chats/', {  
        method: 'POST',  
        headers: {  
          "Authorization": `${token}`,  
          "Content-Type": "application/json"  
        },  
        body: JSON.stringify({user1Id, user2Id})  
      });  

      if (!res.ok) {  
        throw new Error("Error creating chat");  
      }  

      const newChat = await res.json(); 
      // console.log("New chats: ", newChat) 
      setChats((prev) => [...prev, newChat]);  
    } catch (error) {  
      console.error("Error creating chat:", error);  
    }  
  }, [token, setChats]);

  useEffect(() => {  
    const fetchRecipients = async () => {  
      if (!token || recipientIds.length === 0) return;  

      // Create a Set to remove duplicate IDs and then convert it back to an array  
      const uniqueRecipientIds = recipientIds.filter((id, index) => recipientIds.indexOf(id) === index);
      
      // console.log("Show unique IDS: ", uniqueRecipientIds)

      try {  
        const usersDataPromises = uniqueRecipientIds.map((id) =>  
          fetch(`/api/users/${id}`, {  
            headers: {  
              "Authorization": `${token}`  
            }  
          }).then((res) => {  
            if (!res.ok) {  
              throw new Error(`Failed to fetch user with ID ${id}`);  
            }  
            return res.json();  
          })  
        );  

        const usersData = await Promise.all(usersDataPromises);  
        setRecipientUsers(usersData);  
      } catch (err) {  
        setError(err instanceof Error ? err.message : 'An error occurred while fetching recipient users');  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchRecipients();  
  }, [recipientIds, token]); 

  return { recipientUsers, updateCurrentChat, potentialChats, createChat, loading, error };  
};