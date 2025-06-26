"use client";

import { TaskType } from '@/types/general';
import React, { useContext, useState } from 'react';

interface PropType {
    children: React.ReactNode
}

interface ContextType {
    task: TaskType,
    setTask: React.Dispatch<React.SetStateAction<TaskType>>
}

const Context = React.createContext<ContextType | null>(null);

export default function TaskContext({ children }: PropType) {

    const [task, setTask] = useState<TaskType>("CHAT");

    return (
        <Context.Provider value={{ task, setTask }}>
            {children}
        </Context.Provider>
    )
}

export function useTask() {
    const context = useContext(Context);
    if (!context) throw new Error("Task Not Found !");
    return context;
}