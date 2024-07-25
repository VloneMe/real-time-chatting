// hooks/useRecipientUser.ts  
import { useAuth } from '@/context/AuthContext';  
import { useEffect, useState } from 'react';  
import { useChats } from './useChats';  

interface User {
  fname: string;  
  _id: string;  
}  

export const useRecipientUser = (recipientIds: string[]) => {  
  const [recipientUsers, setRecipientUsers] = useState<User[]>([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);  
  const [potentialChats, setPotentialChats] = useState<User[]>([]);  
  const { user } = useAuth();  
  const { chats } = useChats();  
  const token = localStorage.getItem('token');
  

  useEffect(() => {  
    const getUsers = async () => {  
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
  
        const users = await res.json(); // Let's check the type here  
  
        console.log("Fetched users:", users); // Debugging log  
  
        // Check if users is an array  
        if (!Array.isArray(users)) {  
          throw new Error("Expected users to be an array");  
        }  
  
        const filteredUsers = users.filter((u: any) => {  
          if (u._id === user?.userId) return false;  
  
          const isChatCreated = chats?.some(chat =>   
            chat.members.includes(u._id)  
          );  
  
          return !isChatCreated;  
        });  
  
        setPotentialChats(filteredUsers);  
      } catch (err) {  
        setError(err instanceof Error ? err.message : 'An error occurred while fetching users');  
      }  
    };  
  
    getUsers();  
  }, [token, user?.userId, chats]);  

  useEffect(() => {  
    const fetchRecipients = async () => {  
      if (!token || recipientIds.length === 0) return;  

      try {  
        const usersDataPromises = recipientIds.map((id) =>  
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

  return { recipientUsers, potentialChats, loading, error };  
};