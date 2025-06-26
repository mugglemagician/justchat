import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth_token')?.value;
    if (req.nextUrl.pathname === "/") {
        if (!token) return NextResponse.redirect(new URL('/auth', req.url));
        try {
            verifyToken(token);
        }
        catch {
            return NextResponse.redirect(new URL('/auth', req.url));
        }
    }

    return NextResponse.next();
}