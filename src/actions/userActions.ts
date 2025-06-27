"use server";

import { gemini } from "@/lib/gemini";
import { verifyToken } from "@/lib/jwt";
import { mongooseConnect } from "@/lib/mongooseConnect";
import { Message, MessageDocument } from "@/Models/Message";
import { getServerActionObjectWithoutPayload, getServerActionObjectWithPayload, getSystemPrompt, uploadImage } from "@/serverUtils";
import { MessageType, SessionType, TaskType } from "@/types/general";
import { Modality } from "@google/genai";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function isAuthenticated() {
    const token = (await cookies()).get('auth_token')?.value;
    if (!token) return null;
    try {
        return verifyToken(token);
    }
    catch {
        console.log("Unauthenticated !");
    }

    return null;
}

export async function sendMessage(message: MessageType, task: TaskType) {

    const user = await isAuthenticated() as SessionType | null;
    if (!user) return redirect('/auth');

    try {
        await mongooseConnect();
        const systemPrompt = getSystemPrompt(task);
        if (task !== "IMAGE") {

            const chat = gemini.chats.create({
                model: process.env.GEMINI_TEXT_MODEL!,
                config: {
                    thinkingConfig: {
                        thinkingBudget: 0
                    },
                    systemInstruction: systemPrompt
                }
            });

            const messages = await Message.find({ task, userId: user.id }).sort({ createdAt: 1 }).lean() as unknown as MessageDocument[];
            for (const message of messages) {
                if (message.author === "SYSTEM") continue;
                await chat.sendMessage({
                    message: message.text
                });
            }

            const res = await chat.sendMessage({ message: message.text });

            const sysMessage: MessageType = {
                text: res.text || "Something Went Wrong !",
                author: "SYSTEM"
            };

            await Message.create({ ...message, task, userId: user.id });
            await Message.create({ ...sysMessage, task, userId: user.id });
            return getServerActionObjectWithPayload(true, res.text || "Something Went Wrong !");
        }

        await Message.create({ ...message, task, userId: user.id });
        // Set responseModalities to include "Image" so the model can generate  an image
        const res = await gemini.models.generateContent({
            model: process.env.GEMINI_IMAGE_MODEL!,
            contents: message.text,
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
            },
        });

        if (!res.candidates || !res.candidates[0].content || !res.candidates[0].content.parts) throw new Error();

        for (const part of res.candidates[0].content.parts) {
            if (part.inlineData) {
                const imageData = part.inlineData.data;
                if (!imageData) throw new Error();
                const buffer = Buffer.from(imageData, "base64");
                const uploadRes = await uploadImage(buffer);
                const sysMessage: MessageType = {
                    text: uploadRes.payload || "",
                    author: "SYSTEM"
                };
                await Message.create({ ...sysMessage, task, userId: user.id });
                return getServerActionObjectWithPayload(true, uploadRes.payload);
            }
        }

        throw new Error();

    }
    catch (err) {
        console.dir(err);
        return getServerActionObjectWithPayload(false, null);
    }
}

export async function getMessages(task: TaskType) {

    const user = await isAuthenticated() as SessionType | null;
    if (!user) return redirect('/auth');

    try {
        await mongooseConnect();
        const messages = await Message.find({ task, userId: user.id }).sort({ createdAt: 1 }).lean() as unknown as MessageDocument[];
        return getServerActionObjectWithPayload(true, JSON.stringify(messages));
    }
    catch {
        return getServerActionObjectWithPayload(false, JSON.stringify([]));
    }
}

export async function clearChat(task: TaskType) {

    const user = await isAuthenticated() as SessionType | null;
    if (!user) return redirect('/auth');


    try {
        await mongooseConnect();
        await Message.deleteMany({ task, userId: user.id });
        return getServerActionObjectWithoutPayload(true);
    }
    catch {
        return getServerActionObjectWithoutPayload(false);
    }
}