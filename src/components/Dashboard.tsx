"use client"
import React, { useContext } from 'react'
import { Container } from './Container'
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/button';

export const Dashboard = () => {
  const { user, login, logout } = useAuth();

  console.log("My data: ", user);
  
  return (
    <section className='w-full h-screen p-8'>
      <Container className='h-full items-center gap-10 flex'>
        <div className='h-full w-3/12 bg-black rounded-xl'>  
           sidebar
        </div> 

        <div className='w-full h-full flex-1 bg-white rounded-xl'>
          Message Area <Button onClick={() => logout()}>Click Me</Button>
        </div>
      </Container>
    </section>
  )
};