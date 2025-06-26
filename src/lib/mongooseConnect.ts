import mongoose from "mongoose";

export async function mongooseConnect() {
    if (mongoose.connection.readyState === 1) return mongoose.connection.asPromise();
    else if (mongoose.connection.readyState === 2) return (await (mongoose.connection.asPromise()));
    return mongoose.connect(process.env.MONGODB_URI!);
}