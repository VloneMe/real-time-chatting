import { useRecipientUser } from "../../hooks/useRecipientUser"
import { useAuth } from "@/context/AuthContext"

export const ChatBox = () => {
    const { user } = useAuth();
    // const { createChat, recipientUsers, messages } = useRecipientUser();
  return (
    <div>ChatBox</div>
  )
}
