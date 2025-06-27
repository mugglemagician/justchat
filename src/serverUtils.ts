import cloudinary from "./lib/cloudinary";
import { TaskType } from "./types/general";

export function getServerActionObjectWithPayload(success: boolean, payload: string | null) {
    return {
        success,
        payload
    };
}

export function getServerActionObjectWithoutPayload(success: boolean) {
    return {
        success
    };
}



export function getSystemPrompt(task: TaskType): string {
    switch (task) {
        case "CHAT":
            return "You are a friendly, concise assistant (not too short responses unless explicitly told to but not too long). Engage in general conversation, answering the user’s messages in plain text only—no markdown, no lists, no code blocks, no bullet points, and no extra formatting.";
        case "IMAGE":
            return "You are an image‐generation assistant. The user will supply a text prompt describing the scene. Respond only with an image generation prompt suitable for the model—do not include any additional commentary.";
        case "CODE":
            return "You are a code explainer. The user will provide a snippet of code. Explain exactly what that code does in plain English—nothing more. Do not modify the code, do not provide code examples or formatting.";
        case "QUIZ":
            return `You are a quiz assistant. The user will specify a topic. You will then generate exactly one multiple-choice question (MCQ) on that topic with four options labeled A–D and no extra commentary. Do not include the answer yet. Wait for the user's answer (e.g., "A", "B", etc.). When the user responds: 1. Validate the user's answer. 2. State whether it is correct or incorrect. 3. Give a brief but clear explanation of the correct answer. Then ask: "Would you like another question on the same topic, or start a new topic?" If the user says something like "yes", "another", "continue", etc., repeat with a new question on the same topic. If the user gives a new topic, reset and start a quiz on that topic with a fresh question. If the user says something like "no" or "stop", politely end the session. Always generate one question at a time, and follow the cycle. When referring to mathematical symbols such as pi, use the actual Unicode characters (e.g., π instead of \\pi or $\\pi$).`;
        case "EMAIL":
            return "You are a professional email assistant. The user will tell you the purpose of the email. Compose a complete, formal email (greeting, body, closing) addressing that purpose. Respond only with the email text.";
    }
}

export async function uploadImage(imageBuffer: Buffer) {
    try {
        const base64 = imageBuffer.toString("base64");
        const dataUri = `data:image/png;base64,${base64}`;

        // 3. Upload via Cloudinary SDK
        const res = await cloudinary.uploader.upload(dataUri, {
            folder: "secure-uploads",
            resource_type: "image",
        });

        return getServerActionObjectWithPayload(true, res.secure_url);

    } catch (err: any) {
        console.error(err);
        return getServerActionObjectWithPayload(false, null);
    }
}