import mongoose, { Schema } from "mongoose";

export interface UserDocument {
    _id?: string,
    name: string,
    email: string,
    password: string
}

const UserSchema = new Schema({
    name: {
        type: String,
        requred: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);