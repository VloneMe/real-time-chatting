"use client"

import { serviceHooks } from '@/hooks/serviceHooks';

const { postData, fetchData } = serviceHooks();

import { createContext, useState, ReactNode, useEffect } from 'react';

interface Chat {
  id: string;
  message: string;
  // Add other chat properties here
}

interface ChatContextType {
  userChats?: Chat[] | null;
  setUserChats?: React.Dispatch<React.SetStateAction<Chat[] | null>>;
  isUserChatsLoading?: boolean;
  setIsUserChatsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  userChatsError?: Error | null;
  setUserChatsError?: React.Dispatch<React.SetStateAction<Error | null>>;
}

export const ChatContext = createContext<ChatContextType | undefined>({});

interface User {
  userId: string;
}

export const ChatContextProvider = ({ children, user }: { children: ReactNode, user: User | null }) => {
  const [userChats, setUserChats] = useState<Chat[] | null>(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState<boolean>(false);
  const [userChatsError, setUserChatsError] = useState<Error | null>(null);

  useEffect(() => {
    const getUserChats = async () => {
      
      if (user?.userId) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        try {
          const token = localStorage.getItem('token');
          // console.log("token", token)
          const res = await fetchData(`/api/chats/${user.userId}`);
          if (res.error) {
            throw new Error(res.error);
          }
          setUserChats(res);
        } catch (error) {
          setUserChatsError(error as Error);
          setUserChats(null);
        } finally {
          setIsUserChatsLoading(false);
        }
      }
    };

    getUserChats();
  }, [user]);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
