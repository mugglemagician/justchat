import ChatWindow from "../ChatWindow";
import TextBar from "../TextBar";
import DockContainer from "../ui/DockContainer";


export default function HomePageClient() {
    return (
        <main className="flex-grow flex flex-col pb-2">
            <DockContainer />
            <ChatWindow />
            <TextBar />
        </main>
    )
}
