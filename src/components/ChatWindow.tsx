"use client";

import { useMessages } from '@/Contexts/MessagesContext'
import React, { useEffect, useState } from 'react'
import Message from './Message';
import { useTask } from '@/Contexts/TaskContext';
import { ClimbingBoxLoader } from 'react-spinners';

export default function ChatWindow() {

    const { messages, setMessages } = useMessages();
    const { task } = useTask();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setMessages([]);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [task]);

    return (
        <section className='flex-grow my-6 py-2 overflow-auto flex'>
            <section className={`w-full max-w-5xl mx-auto flex flex-grow flex-col ${isLoading ? 'justify-center' : 'justify-start'} items-center gap-11`}>

                {
                    isLoading ? <ClimbingBoxLoader color='white' /> :
                        messages.map((message, idx) => (
                            <Message key={idx} message={message} />
                        ))
                }
            </section>
        </section>
    )
}
