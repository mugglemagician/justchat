import ChatWindow from "../ChatWindow";
import TextBar from "../TextBar";
import DockContainer from "../ui/DockContainer";


export default function HomePageClient() {
    return (
        <main className="flex-grow flex flex-col py-2">
            <DockContainer />
            <ChatWindow />
            <TextBar />
        </main>
    )
}
