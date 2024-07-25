import React from 'react'
import { Button } from '../ui/button'
import { Container } from '../Container'
import { useAuth } from '@/context/AuthContext'

export const Navbar = () => {

    const { logout } = useAuth();
    return (
        <footer className='h-[4rem] w-full border-b flex absolute top-0 left-0 bg-white shadow-sm'>
            <Container className='flex items-center justify-between'>
                <div>
                    <h2>Username</h2>
                    <p className='text-sm'>last seen</p>
                </div>

                <div>
                    <Button onClick={() => logout()}>Logout</Button>
                </div>
            </Container>
        </footer>
    )
};