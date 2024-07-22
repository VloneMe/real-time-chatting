"use client"
import React, { useContext } from 'react'
import { Container } from './Container'
import { Button } from './ui/button';
import { useAuth } from '@/context/AuthContext';

export const Dashboard = () => {
  const { user, login, logout } = useAuth();

  console.log("My data: ", user);
  
  return (
    <section>
      <Container>
        <div>  
            {user ? (  
                <div>  
                    <p className='text-7xl font-bold'>{user.fname}</p>
                </div>  
            ) : (  
              <p className='text-7xl font-bold'>LogOut</p>
            )}  
        </div> 
      </Container>
    </section>
  )
}
