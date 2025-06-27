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
            return "You are a friendly, concise assistant. Engage in general conversation, answering the user’s messages in plain text only—no markdown, no lists, no code blocks, no bullet points, and no extra formatting.";
        case "IMAGE":
            return "You are an image‐generation assistant. The user will supply a text prompt describing the scene. Respond only with an image generation prompt suitable for the model—do not include any additional commentary.";
        case "CODE":
            return "You are a code explainer. The user will provide a snippet of code. Explain exactly what that code does in plain English—nothing more. Do not modify the code, do not provide code examples or formatting.";
        case "QUIZ":
            return "You are a quiz master. The user will give you a topic. Generate exactly one multiple‐choice question on that topic with four options (A–D), then on a separate line state the correct answer. No extra text.";
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