"use client";

import { MessageType } from '@/types/general';
import React, { useContext, useState } from 'react';

interface PropType {
    children: React.ReactNode
}

interface ContextType {
    messages: MessageType[],
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>
}

const Context = React.createContext<ContextType | null>(null);

export default function MessagesContext({ children }: PropType) {

    const [messages, setMessages] = useState<MessageType[]>([]);

    return (
        <Context.Provider value={{ messages, setMessages }}>
            {children}
        </Context.Provider>
    )
}

export function useMessages() {
    const context = useContext(Context);
    if (!context) throw new Error("Messages Not Found !");
    return context;
}