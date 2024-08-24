import React from 'react'
import { Button } from '../ui/button'
import { Container } from '../Container'
import { useAuth } from '@/context/AuthContext'


interface Props {
    username: string;
}
export const Navbar = ({ username }: Props) => {

    const { logout } = useAuth();
    return (
        <footer className='h-[4rem] w-full border-b flex absolute z-10 top-0 left-0 bg-white shadow-sm'>
            <Container className='flex items-center justify-between'>
                <div>
                    <h2>{username}</h2>
                    <p className='text-sm'>last seen</p>
                </div>

                <div>
                    <Button onClick={() => logout()}>Logout</Button>
                </div>
            </Container>
        </footer>
    )
};