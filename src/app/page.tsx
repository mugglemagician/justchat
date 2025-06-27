import { verifyToken } from "@/lib/jwt";
import HomePageClient from "../components/pageclient/HomePageClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SessionContext from "@/Contexts/SessionContext";
import { SessionType } from "@/types/general";
import MessagesContext from "@/Contexts/MessagesContext";

export default async function Home() {

  const token = (await cookies()).get('auth_token')?.value;
  if (!token) redirect('/auth');
  const payload = verifyToken(token);
  const { id, username, email } = payload as SessionType;

  return (
    <SessionContext sessionInit={{ id, username, email }}>
      <MessagesContext>
        <HomePageClient />
      </MessagesContext>
    </SessionContext>
  );
}
