"use client";

import { useState } from "react";
import FloatingLabelInput from "../FloatingLabelInput";
import { LogIn, UserPlus } from "lucide-react";
import { SyncLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export default function AuthPageClient() {

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isLogginIn, setIsLogginIn] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleAuth = async () => {
        if (isLoading) return;
        if (email === "" || password === "" || (username === "" && !isLogginIn)) return;
        setIsLoading(true);
        try {
            if (isLogginIn) {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (!data.user) throw new Error();
            }
            else {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, password })
                });
                const data = await res.json();
                if (!data.user) throw new Error();
            }

            return router.push('/');

        }
        catch {
            alert("Something Went Wrong !");
        }

        setIsLoading(false);
    }


    return (
        <main className='flex-grow flex flex-col gap-11 justify-center items-center'>
            <h1 className="text-white font-extrabold text-4xl">
                JustChat
            </h1>
            <form onSubmit={e => e.preventDefault()} className="max-w-fit mx-auto flex flex-col justify-center items-center gap-6">

                {
                    !isLogginIn &&
                    <FloatingLabelInput
                        value={username}
                        handleChange={e => setUsername(e.target.value)}
                        id="username"
                        label="Username"
                        type="text" />
                }

                <FloatingLabelInput
                    value={email}
                    handleChange={e => setEmail(e.target.value)}
                    id="email"
                    label="Email"
                    type="email" />

                <FloatingLabelInput
                    value={password}
                    handleChange={e => setPassword(e.target.value)}
                    id="password"
                    label="Password"
                    type="password" />

                <button
                    onClick={handleAuth}
                    className="font-extrabold h-[3em] transition-all hover:-translate-y-0.5 hover:brightness-110 duration-200 inline-flex justify-center items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-600 w-full cursor-pointer">
                    {
                        isLoading ? <SyncLoader /> : (
                            isLogginIn ?
                                <>
                                    <LogIn className="w-5 h-5" /> Login
                                </> :
                                <>
                                    <UserPlus className="w-5 h-5" /> Register
                                </>
                        )
                    }
                </button>

                <a onClick={e => { e.preventDefault(); if (isLoading) return; setIsLogginIn(prev => !prev); }} className="text-white hover:text-cyan-400 transition-all underline font-bold cursor-pointer">
                    {isLogginIn ? "Register" : "Login"}
                </a>
            </form>
        </main>
    )
}
