import AuthPageClient from "@/components/pageclient/AuthPageClient";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthPage() {

    const token = (await cookies()).get('auth_token')?.value;
    if (token) {
        const payload = verifyToken(token);
        if (payload) return redirect('/');
    }


    return (
        <AuthPageClient />
    )
}
