import { useChats } from '@/hooks/useChats';
import { useRecipientUser } from '@/hooks/useRecipientUser'
import { IoMdPerson } from "react-icons/io";

export const PotentialChats = () => {

    const { recipientIds } = useChats();

    const { potentialChats } = useRecipientUser(recipientIds);

    console.log("pcharts: ", potentialChats);

    return (
        <div>
            {potentialChats && potentialChats.map((chat, index) => (
                <div className='gap-2'>
                    <IoMdPerson size={20} className='size-5 rounded-full ml-2'/>
                    <p className='text-sm'>{chat.username}</p>
                </div>
            ))}
        </div>
    )
};