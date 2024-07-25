"use client";  

import React, { useEffect } from 'react';  
import { Container } from '../../Container';  
import { useChats } from '@/hooks/useChats';  

export const SideBar = () => {  
  const { chats, recipientIds, loading, error, getRecipients } = useChats();  

  useEffect(() => {  
    if (recipientIds.length > 0) {  
      getRecipients().then((recipientData) => {  
        console.log("Fetched recipient data: ", recipientData);  
        // Handle recipient data as needed  
      });  
    }  
  }, [recipientIds, getRecipients]);  

  if (loading) {  
    return <div>Loading...</div>;  
  }  

  if (error) {  
    return <div>Error: {error}</div>;  
  }  

  return (  
    <section className='w-1/4 min-h-screen'>  
      <Container>  
        <h2>Chats</h2>  
        {chats.map(chat => (  
          <div key={chat.id}>  
            {/* Render chat details */}  
          </div>  
        ))}  
      </Container>  
    </section>  
  );  
};