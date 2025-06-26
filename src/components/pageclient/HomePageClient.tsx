import MessagesContext from "@/Contexts/MessagesContext";
import ChatWindow from "../ChatWindow";
import TextBar from "../TextBar";
import DockContainer from "../ui/DockContainer";


export default function HomePageClient() {
    return (
        <MessagesContext>
            <main className="flex-grow flex flex-col py-2">
                <DockContainer />
                <ChatWindow />
                <TextBar />
            </main>
        </MessagesContext>
    )
}
