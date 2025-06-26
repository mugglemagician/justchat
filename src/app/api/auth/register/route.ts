import { signToken } from "@/lib/jwt";
import { mongooseConnect } from "@/lib/mongooseConnect";
import { User, UserDocument } from "@/Models/User";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await mongooseConnect();
    const { name, email, password } = await req.json();
    const existing = await User.findOne({ email }).lean() as UserDocument | null;
    if (existing) return NextResponse.json({ error: "Email already used" }, { status: 400 });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword }) as UserDocument;
    const token = signToken({ id: user._id, email: user.email });
    const serialized = serialize("auth_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    const res = NextResponse.json({
        user: { id: user._id, name: user.name, email: user.email },
    });

    res.headers.set("Set-Cookie", serialized); // ✅ Now it's applied correctly

    return res;

}