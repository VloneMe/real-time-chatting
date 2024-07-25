import React from 'react';  
import { useRecipientUser } from '@/hooks/useRecipientUser'; 
import { useAuth } from '@/context/AuthContext';   
import { PotentialChats } from './PotentialChats';

interface UserChatProps {  
  recipientIds: string[]; // This should be passed as a prop  
}  

export const UserChat: React.FC<UserChatProps> = ({ recipientIds }) => {  
  const { user } = useAuth();

  // Call the custom hook to fetch recipient users.  
  const { recipientUsers, loading, error } = useRecipientUser(recipientIds);
  console.log("Recipient Users: ", recipientUsers) 

  if (loading) {  
    return <div>Loading user data...</div>; // Display loading state  
  }  

  if (error) {  
    return <div>Error fetching user data: {error}</div>; // Display error state  
  }  

  return (  
    <div className='px-5 space-y-5'>
      <h2 className='text-2xl my-5 font-bold text-center border px-6 py-3 rounded-lg'>User Chats</h2>  
      {recipientUsers.length === 0 ? (  
        <p>No users found.</p>  
      ) : (  
        recipientUsers.map((recipient) => ( 
          <div className=''>
            <div className='my-5'>
              <PotentialChats />
            </div>

            <div    key={recipient._id}
                    className='border-b pb-2 flex gap-2'
            >
                <span className='bg-green-700 size-3 p-1 rounded-full mt-2'></span>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex gap-3 items-center'
                    >  
                        <div className='gap-3 relative items-center'>
                            <p className='text-lg'>{recipient.fname}</p>
                            <p className='text-sm text-gray-500'>text message</p> 
                        </div>
                    </div>
                    <div className='text-end relative'
                    >  
                        
                        <p className='text-sm'>12/4/2324</p>  
                        <p className='text-sm text-white bg-red-700 p-1 rounded-full float-end size-6 flex items-center justify-center'>2</p> 
                    </div>
                </div>
            </div> 
          </div>
        ))  
      )}  
    </div>  
  );  
};