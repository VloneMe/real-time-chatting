"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';  

interface RecipientContextType {  
    recipientIds: string[];
    setRecipientIds: (ids: string[]) => void;  
}  

const RecipientContext = createContext<RecipientContextType | undefined>(undefined);  

export const RecipientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {  
    const [recipientIds, setRecipientIds] = useState<string[]>([]);  

    return (  
        <RecipientContext.Provider value={{ recipientIds, setRecipientIds }}>  
            {children}  
        </RecipientContext.Provider>  
    );  
};  

export const useRecipientContext = (): RecipientContextType => {  
    const context = useContext(RecipientContext);  
    if (!context) {  
        throw new Error('useRecipientContext must be used within a RecipientProvider');  
    }  
    return context;  
};