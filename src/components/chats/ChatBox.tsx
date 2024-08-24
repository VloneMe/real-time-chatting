import { useRecipientUser } from "../../hooks/useRecipientUser"
import { useAuth } from "@/context/AuthContext"
import { ChatProvider } from '../../context/ChatProvider1';
import { Container } from "../Container";
import { Navbar } from "./Navbar";

export const ChatBox = () => {
    const { user } = useAuth();
    const { messages, recipientUser, currentChat, loadingMessages } = useRecipientUser();
    // const [receipientUser, ]

    console.log("Recipient User: ", recipientUser)

    if (!recipientUser){
      return (
        <div className="h-full w-full flex items-center justify-center">
          <p>Select Chat to start conversation!</p>
        </div>
      )
    };

    if (loadingMessages){
      return (
        <div className="h-full w-full flex items-center justify-center">
          <p>Loading.... </p>
        </div>
      )
    };

    return (
      <div className="h-full w-full pt-[5rem]">
        <Container>
          <Navbar username={recipientUser.username}/>
            <p>Chatting Box</p>
        </Container>
      </div>
    )
}