import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MessagesContext from "@/Contexts/MessagesContext";
import TaskContext from "@/Contexts/TaskContext";
import SessionContext from "@/Contexts/SessionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Just Chat",
  description: "Just Chat Mate !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden h-[100svh] bg-gradient-to-b from-gray-800 to-black flex`}
      >
        <TaskContext>
          {children}
        </TaskContext>
      </body>
    </html>
  );
}
