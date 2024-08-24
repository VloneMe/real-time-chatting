import { useEffect, useState } from 'react';  
import { useAuth } from '@/context/AuthContext';
import { useRecipientUser } from './useRecipientUser';
import { Console } from 'console';

interface Chat {  
  members: string[];  
  // Add additional fields as necessary  
}  

export const useChats = () => {  
  const [chats, setChats] = useState<Chat[]>([]);  
  const [recipientIds, setRecipientIds] = useState<string[]>([]); 
  const [error, setError] = useState<string | null>(null);  
  const [loading, setLoading] = useState(true);  
  const { user } = useAuth();
  const token = localStorage.getItem('token');

  const [recipientUser, setRecipientUser] = useState<any>()
   
  console.log("get recipients: ", recipientUser)
  
  // console.log("recipient ids:", recipientIds); 
  

  // Fetch chats  
  useEffect(() => {  
    const getChats = async () => {  
      setLoading(true);  
      try {  
        const res = await fetch(`/api/chats/${user?.userId}`, {  
          headers: {  
            "Authorization": `${token}`  
          }  
        });  
        if (!res.ok) {  
          throw new Error('Failed to fetch chats');  
        }  
        const data = await res.json();  
        setChats(data.data);  
      } catch (err) {  
        setError(err instanceof Error ? err.message : 'An error occurred');  
      } finally {  
        setLoading(false);  
      }  
    };  

    if (user) {  
      getChats();  
    }  
  }, [user, token]);  

  // Update recipientIds whenever chats or userId changes  
  useEffect(() => {  
    const nonMatchingIds = chats.flatMap((item) =>  
      item.members.filter((memberId: string) => memberId !== user?.userId)  
    );  
    setRecipientIds(nonMatchingIds);  
  }, [chats, user?.userId]);  

  // Fetch recipient data based on recipientIds  
  const getRecipients = async () => {  
    setLoading(true);  
    const recipientData: any[] = [];  
    for (const recipientId of recipientIds) {  
      try {  
        const res = await fetch(`/api/chats/${recipientId}`, {  
          headers: { "Authorization": `${token}` }  
        });  
        if (!res.ok) {  
          throw new Error(`Failed to fetch recipient with ID ${recipientId}`);  
        }  
        const data = await res.json();
        setRecipientUser(data) 
        recipientData.push(data);  
      } catch (err) {  
        setError(err instanceof Error ? err.message : 'An error occurred while fetching a recipient');  
      }  
    }  
    setLoading(false);  
    return recipientData;  
  };  

  useEffect(() => {
    getRecipients()
  }, [setRecipientUser])

  return { chats, setChats, recipientUser, recipientIds, loading, error, getRecipients };  
};