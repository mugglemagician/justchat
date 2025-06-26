"use client";

import React from 'react'
import { SmartDock, SmartDockItemProps } from './SmartDock'
import { ALargeSmall, Brain, Code, Image, Keyboard, LogIn, Mail, UsersRound } from 'lucide-react'
import { useTask } from '@/Contexts/TaskContext';

export default function DockContainer() {

    const { task, setTask } = useTask();

    const dockItems: SmartDockItemProps[] = [{
        icon: <ALargeSmall className={`${task === "CHAT" ? "text-white" : "text-white/60"} cursor-pointer`} />,
        label: "General Chat",
        onClick: () => setTask("CHAT")
    },
    {
        icon: <Image className={`${task === "IMAGE" ? "text-white" : "text-white/60"} cursor-pointer`} />,
        label: "Text To Image",
        onClick: () => setTask("IMAGE")
    },
    {
        icon: <Code className={`${task === "CODE" ? "text-white" : "text-white/60"} cursor-pointer`} />,
        label: "Code Explainer",
        onClick: () => setTask("CODE")
    },
    {
        icon: <Brain className={`${task === "QUIZ" ? "text-white" : "text-white/60"} cursor-pointer`} />,
        label: "Quiz Mentor",
        onClick: () => setTask("QUIZ")
    },
    {
        icon: <Mail className={`${task === "EMAIL" ? "text-white" : "text-white/60"} cursor-pointer`} />,
        label: "Email Generator",
        onClick: () => setTask("EMAIL")
    },
    {
        icon: <LogIn className='text-white cursor-pointer' />,
        label: "Login"
    }];

    return (
        <div className='w-full mx-auto'>
            <SmartDock items={dockItems} hoverStyle='float' variant='glass' className='max-w-fit' />
        </div>
    )
}
