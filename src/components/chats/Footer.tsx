import React from 'react'
import { Button } from '../ui/button'
import { Container } from '../Container'
import { useAuth } from '@/context/AuthContext'

export const Footer = () => {

    const { logout } = useAuth();
    return (
        <nav className='h-[5rem] w-full border-t-2 flex absolute bottom-0 left-0 bg-white'>
            <Container className='flex items-center justify-between'>
                <div>
                    <h2>Username</h2>
                    <p className='text-sm'>last seen</p>
                </div>

                <div>
                <Button onClick={() => logout()}>send</Button>
                </div>
            </Container>
        </nav>
    )
};