import { TaskType } from "@/types/general";
import mongoose, { Model, Schema } from "mongoose";

export interface MessageDocument {
    _id?: string,
    text: string,
    author: "USER" | "SYSTEM",
    task: TaskType,
    userId: string
}

const MessageSchema = new Schema({
    text: {
        type: String,
        require: true
    },
    author: {
        type: String,
        enum: ['USER', 'SYSTEM'],
        required: false
    },
    task: {
        type: String,
        enum: ["CHAT", "IMAGE", "CODE", "QUIZ", "EMAIL"],
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Message: Model<MessageDocument> = mongoose.models.Message || mongoose.model('Message', MessageSchema);