"use client";

import React, { useState } from 'react'
import AutoResizeTextarea from './TextArea'
import { Eraser, SendHorizonal } from 'lucide-react'
import { useMessages } from '@/Contexts/MessagesContext';
import { clearChat, sendMessage } from '@/actions/userActions';
import { MessageType } from '@/types/general';
import { ClipLoader } from 'react-spinners';
import { useTask } from '@/Contexts/TaskContext';

export default function TextBar() {

    const [userMessage, setUserMessage] = useState<string>("");
    const { setMessages } = useMessages();
    const [isSending, setIsSending] = useState<boolean>(false);
    const [isClearing, setIsClearing] = useState<boolean>(false);
    const { task } = useTask();

    const handleSend = async () => {

        if (userMessage.trim() === "") return;

        if (isSending || isClearing) return;
        setIsSending(true);

        const message: MessageType = {
            text: userMessage.trim(),
            author: "USER",
        };

        setUserMessage("");
        setMessages(prev => [...prev, message]);
        try {
            const res = await sendMessage(message, task);
            if (res.success) {
                const systemMessage: MessageType = {
                    text: res.payload as string,
                    author: "SYSTEM",
                };
                setMessages(prev => [...prev, systemMessage]);
            }
            else {
                throw new Error();
            }
        }
        catch {
            alert("Something Went Wrong !");
        }

        setIsSending(false);
    }

    const handleClearChat = async () => {
        if (isSending || isClearing) return;
        setIsClearing(true);
        const res = await clearChat(task);
        if (res.success) {
            setMessages([]);
        }
        else {
            alert("Something Went Wrong !");
        }
        setIsClearing(false);
    }

    return (
        <form onSubmit={e => e.preventDefault()} className='text-white pb-2 px-3 sm:px-6 flex justify-center items-center gap-4 w-full'>
            <AutoResizeTextarea
                value={userMessage}
                onChange={e => setUserMessage(userMessage === "" && e.target.value === " " ? "" : e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                    }
                }} />
            <button className='cursor-pointer' onClick={handleSend}>
                {isSending ? <ClipLoader color='white' size={'25px'} /> : <SendHorizonal className='w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]' />}
            </button>

            <button type='button' className='cursor-pointer' onClick={handleClearChat}>
                {isClearing ? <ClipLoader color='white' size={'25px'} /> : <Eraser className='w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]' />}
            </button>
        </form>
    )
}
