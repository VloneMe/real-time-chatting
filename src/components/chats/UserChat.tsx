import React from 'react';  
import { useRecipientUser } from '@/hooks/useRecipientUser';   
import { useAuth } from '@/context/AuthContext';   
import { PotentialChats } from './PotentialChats';  
import { useChats } from '../../hooks/useChats';  

// Define a type for the recipient  
interface Recipient {  
    _id: string;  
    fname: string;  
}  

interface UserChatProps {  
    recipientIds: string[];  
}  

export const UserChat: React.FC<UserChatProps> = ({ recipientIds }) => {  
    const { user } = useAuth();  
    const { chats } = useChats();  
    const { recipientUsers, updateCurrentChat, loading, error } = useRecipientUser(recipientIds);  

    if (loading) {  
        return <div>Loading user data...</div>;
    }  

    if (error) {  
        return <div>Error fetching user data: {error}</div>; 
    }  

    const handleChatUpdate = (recipient: Recipient) => {  
        console.log("Selected recipient:", recipient);  

        // Checks if the recipient ID is present in any chat members  
        const chatFound = chats.find(chat => chat.members.includes(recipient._id));

        if (chatFound) {  
            // Get the corresponding chat details here directly  
            // console.log("Chat Info:", chatFound);
            updateCurrentChat(chatFound);  
        } else {  
            console.info("Creating new chat because recipient ID not found in existing chats:", recipient._id);  
            const newChatInfo = { recipientId: recipient._id, messages: [], otherProps: {} }; 
            updateCurrentChat(newChatInfo);  
        }   
    };  

    return (  
        <div className='px-5 space-y-5'>  
            <h2 className='text-2xl my-5 font-bold text-center border px-6 py-3 rounded-lg'>User Chats</h2>  

            <div>  
              <PotentialChats />  
            </div>  
            {recipientUsers.length === 0 ? (  
                <p>No users found.</p>  
            ) : (  
                recipientUsers.map((recipient: Recipient) => (   
                    <div key={recipient._id} role='button' onClick={() => handleChatUpdate(recipient)} className='my-5'>  
                        <div className='border-b pb-2 flex gap-2'>  
                            <span className='bg-green-700 size-3 p-1 rounded-full mt-2'></span>  
                            <div className='flex items-center justify-between w-full'>  
                                <div className='flex gap-3 items-center'>  
                                    <div className='gap-3 relative items-center'>  
                                        <p className='text-lg'>{recipient.fname}</p>  
                                        <p className='text-sm text-gray-500'>text message</p>   
                                    </div>  
                                </div>  
                                <div className='text-end relative'>  
                                    <p className='text-sm'>12/4/2324</p>  
                                    <p className='text-sm text-white bg-red-700 p-1 rounded-full flex items-center justify-center'>2</p>   
                                </div>  
                            </div>  
                        </div>   
                    </div>  
                ))  
            )}  
        </div>  
    );  
};