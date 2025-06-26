"use server";

import { gemini } from "@/lib/gemini";
import { getServerActionObjectWithPayload, getSystemPrompt, uploadImage } from "@/serverUtils";
import { MessageType, TaskType } from "@/types/general";
import { Modality } from "@google/genai";

export async function sendMessage(message: MessageType, task: TaskType) {
    try {
        const systemPrompt = getSystemPrompt(task);
        if (task !== "IMAGE") {
            const res = await gemini.models.generateContent({
                model: process.env.GEMINI_TEXT_MODEL!,
                contents: message.text,
                config: {
                    thinkingConfig: {
                        thinkingBudget: 0
                    },
                    systemInstruction: systemPrompt
                }
            });

            return getServerActionObjectWithPayload(true, res.text || "Something Went Wrong !");
        }

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
                console.log("Image saved to cloudinary");
                return getServerActionObjectWithPayload(true, uploadRes.payload);
            }
        }

        throw new Error();

    }
    catch {
        return getServerActionObjectWithPayload(false, null);
    }
}