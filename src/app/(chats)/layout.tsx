import { useAuth } from '@/context/AuthContext';
import { ChatContextProvider } from '@/context/ChatContext';
import React, { ReactNode } from 'react';


interface Props {
  children: ReactNode
}

const ChatLayout = ({ children }: Props) => {

  const user = {userId: "669b99266bae3a721ac9af4e"};

  return (
    <ChatContextProvider user={user}>
        { children }
    </ChatContextProvider>
  );
};

export default ChatLayout;