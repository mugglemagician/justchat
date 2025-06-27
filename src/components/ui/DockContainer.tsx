"use client";

import React, { useState } from 'react'
import { SmartDock, SmartDockItemProps } from './SmartDock'
import { ALargeSmall, Brain, Code, Image as ImageIcon, LogOut, Mail, Menu, X } from 'lucide-react'
import { useTask } from '@/Contexts/TaskContext';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';
import { TaskType } from '@/types/general';

export default function DockContainer() {

    const { task, setTask, setIsReady } = useTask();
    const router = useRouter();

    const [isMenuShowing, setIsMenuShowing] = useState<boolean>(false);

    const handleTaskChange = (task: TaskType) => {
        setIsReady(false);
        setTask(task);
    }

    const handleLogout = async () => {
        await fetch('/api/auth/logout', {
            method: "POST"
        });
        router.push('/auth');
    }

    const dockItems: SmartDockItemProps[] = [{
        icon: <ALargeSmall className={`${task === "CHAT" ? "text-white" : "text-white/60"} cursor-pointer`} />,
        label: "General Chat",
        onClick: () => handleTaskChange("CHAT")
    },
    {
        icon: <ImageIcon className={`${task === "IMAGE" ? "text-white" : "text-white/60"} cursor-pointer`} />,
        label: "Text To Image",
        onClick: () => handleTaskChange("IMAGE")
    },
    {
        icon: <Code className={`${task === "CODE" ? "text-white" : "text-white/60"} cursor-pointer`} />,
        label: "Code Explainer",
        onClick: () => handleTaskChange("CODE")
    },
    {
        icon: <Brain className={`${task === "QUIZ" ? "text-white" : "text-white/60"} cursor-pointer`} />,
        label: "Quiz Mentor",
        onClick: () => handleTaskChange("QUIZ")
    },
    {
        icon: <Mail className={`${task === "EMAIL" ? "text-white" : "text-white/60"} cursor-pointer`} />,
        label: "Email Generator",
        onClick: () => handleTaskChange("EMAIL")
    },
    {
        icon: <LogOut className='text-white cursor-pointer' />,
        label: "Logout",
        onClick: handleLogout
    }];

    return (
        <div className='w-full px-4 py-2 bg-gradient-to-r flex justify-center items-center'>
            <Link href={'/'} className="w-[50px] h-[50px]">
                <Image src={'/justchat.png'} alt="" width={512} height={512} className="w-full h-full" />
            </Link>
            {
                isMenuShowing ?
                    <X className='text-white cursor-pointer w-9 h-9 ml-auto sm:hidden' onClick={() => setIsMenuShowing(false)} />
                    :
                    <Menu className='text-white w-9 h-9 cursor-pointer ml-auto sm:hidden' onClick={() => setIsMenuShowing(true)} />

            }

            <SmartDock items={dockItems} hoverStyle='float' variant='glass' smallClassName={`${isMenuShowing ? 'right-2' : 'right-[-100px]'}`} />
        </div >
    )
}
