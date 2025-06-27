"use client";

import { TaskType } from '@/types/general';
import React, { useContext, useState } from 'react';

interface PropType {
    children: React.ReactNode
}

interface ContextType {
    isReady: boolean,
    setIsReady: React.Dispatch<React.SetStateAction<boolean>>,
    task: TaskType,
    setTask: React.Dispatch<React.SetStateAction<TaskType>>
}

const Context = React.createContext<ContextType | null>(null);

export default function TaskContext({ children }: PropType) {

    const [task, setTask] = useState<TaskType>("CHAT");
    const [isReady, setIsReady] = useState<boolean>(false);

    return (
        <Context.Provider value={{ task, setTask, isReady, setIsReady }}>
            {children}
        </Context.Provider>
    )
}

export function useTask() {
    const context = useContext(Context);
    if (!context) throw new Error("Task Not Found !");
    return context;
}