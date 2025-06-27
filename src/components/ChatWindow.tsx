"use client";

import { useMessages } from '@/Contexts/MessagesContext'
import React, { useEffect } from 'react'
import Message from './Message';
import { useTask } from '@/Contexts/TaskContext';
import { ClimbingBoxLoader } from 'react-spinners';
import { getMessages } from '@/actions/userActions';

export default function ChatWindow() {

    const { messages, setMessages } = useMessages();
    const { task, isReady, setIsReady } = useTask();

    useEffect(() => {

        setMessages([]);
        getMessages(task)
            .then(res => setMessages(JSON.parse(res.payload || "[]")))
            .catch(() => alert("Something Went Wrong !"))
            .finally(() => {
                setIsReady(true);
            });


    }, [task]);

    return (
        <section className='flex-grow my-6 py-2 overflow-auto flex px-6 sm:px-11'>
            <section className={`w-full max-w-5xl mx-auto flex flex-grow flex-col ${!isReady ? 'justify-center' : 'justify-start'} items-center gap-11`}>

                {
                    !isReady ? <ClimbingBoxLoader color='white' /> :
                        messages.map((message, idx) => (
                            <Message key={idx} message={message} />
                        ))
                }
            </section>
        </section>
    )
}
