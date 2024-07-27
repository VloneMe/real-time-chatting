import React from 'react';  
import { useChats } from '@/hooks/useChats';  
import { useRecipientUser } from '@/hooks/useRecipientUser';  
import { IoMdPerson } from "react-icons/io";  
import { useAuth } from '@/context/AuthContext';  

export const PotentialChats: React.FC = () => {  
    const { user } = useAuth();  
    const { recipientIds } = useChats();  
    const { potentialChats, createChat } = useRecipientUser(recipientIds); 
    
    const idUser = user?.userId  

    const handleChatClick = async (recipientId: string) => {
        if (user?.userId) {  
            try {  
                await createChat(user.userId, recipientId);  
                console.log("Chat created successfully.");
            } catch (err) {  
                console.error("Error creating chat:", err);  
            }  
        }  
    };  

    return (  
        <div className='flex gap-3'>  
            {potentialChats && potentialChats.length > 0 ? (  
                potentialChats.map((pchat) => (  
                    <div   
                        key={pchat._id}   
                        className='gap-2 cursor-pointer'   
                        onClick={() => handleChatClick(pchat._id)}   
                        role="button"   
                        aria-label={`Start chat with ${pchat.username}`}  
                    >  
                        <IoMdPerson size={20} className='size-5 rounded-full ml-2' />  
                        <p className='text-sm'>{pchat.username}</p>  
                    </div>  
                ))  
            ) : (  
                <p>No potential chats available.</p>  
            )}  
        </div>  
    );  
};