import { signToken } from "@/lib/jwt";
import { mongooseConnect } from "@/lib/mongooseConnect";
import { User, UserDocument } from "@/Models/User";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await mongooseConnect();
    const { email, password } = await req.json();
    const user = await User.findOne({ email }).lean() as UserDocument | null;
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ error: "Invalid Credentials !" }, { status: 401 });
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