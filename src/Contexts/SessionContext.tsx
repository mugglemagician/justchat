"use client";

import { SessionType } from '@/types/general';
import React, { useContext, useState } from 'react'

interface PropType {
    children: React.ReactNode,
    sessionInit: SessionType | null
}

interface ContextType {
    session: SessionType | null,
    setSession: React.Dispatch<React.SetStateAction<SessionType | null>>
}

const Context = React.createContext<ContextType | null>(null);

export default function SessionContext({ children, sessionInit }: PropType) {

    const [session, setSession] = useState<SessionType | null>(sessionInit);

    return (
        <Context.Provider value={{ session, setSession }}>
            {children}
        </Context.Provider>
    )
}

export function useSession() {
    const context = useContext(Context);
    if (!context) throw new Error("Session Not Found !");
    return context;
}