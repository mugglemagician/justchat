import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const serialized = serialize("auth_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });

    const res = NextResponse.redirect(new URL("/auth", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
    res.headers.set("Set-Cookie", serialized);

    return res;
}