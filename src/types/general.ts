export interface MessageType {
    text: string,
    author: "USER" | "SYSTEM",
}

export type TaskType = "CHAT" | "IMAGE" | "CODE" | "QUIZ" | "EMAIL";

export type SessionType = {
    id: string,
    username: string,
    email: string
};