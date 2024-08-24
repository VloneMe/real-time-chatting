"use client"

import { Container } from './Container'
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/button';
import { useContext } from 'react';
import { UserChat } from './chats/UserChat';
import { useChats } from '@/hooks/useChats';
import { SignIn } from './forms/SignIn';
import { Navbar } from './chats/Navbar';
import { Footer } from './chats/Footer';
import { ChatBox } from './chats/ChatBox';

export const Dashboard = () => {
  const { user, login, logout } = useAuth();

  const { recipientIds } = useChats()
  
  if (user){
  return (
    <section className='w-full h-screen p-8'>
      <Container className='h-full items-center flex'>
        <div className='h-full w-4/12 bg-black rounded-tl-xl rounded-bl-xl text-white overflow-hidden pb-5'>  
           <UserChat recipientIds={recipientIds}/>
        </div> 

        <div className='w-full h-full flex-1 bg-white rounded-tr-xl rounded-br-xl shadow-2xl border-2 border-black relative'>
          {/* <Navbar /> */}
            <ChatBox />
          <Footer />
        </div>
      </Container>
    </section>
  )} else {
    return <SignIn />
  }
};