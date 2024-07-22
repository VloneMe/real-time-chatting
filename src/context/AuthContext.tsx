"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';

interface User {
    userId: string;
    username: string;
    fname: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('User logged in:', userData); // Debugging log
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        console.log('User logged out'); // Debugging log
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            console.log('User retrieved from localStorage:', parsedUser); // Debugging log
        } else {
            console.log('No user found in localStorage'); // Debugging log
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};