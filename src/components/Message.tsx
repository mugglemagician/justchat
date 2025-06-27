import { MessageType } from "@/types/general"
import { Copy } from "lucide-react"
import CopyButton from "./CopyButton"
import { useTask } from "@/Contexts/TaskContext"
import Image from "next/image"

interface PropType {
    message: MessageType
}

export default function Message({ message }: PropType) {

    const { task } = useTask();

    return (
        <>
            {
                task === "IMAGE" && message.author === "SYSTEM" ?
                    <div className="max-w-[80%] mr-auto rounded-xl h-auto">
                        <Image src={message.text} alt="" width={1920} height={1080} className="rounded-xl" />
                    </div>
                    :
                    <div className={`text-white font-semibold text-md sm:text-xl whitespace-pre-wrap ${message.author === "USER" && 'max-w-[80%] sm:max-w-[60%]'} ${message.author === "USER" ? "place-self-end" : "place-self-start"}`}>
                        <p className={`${message.author === "USER" && 'bg-gray-700 p-4'} rounded-xl`}>
                            {message.text}
                        </p>
                        <CopyButton text={message.text} styles={message.author === "USER" ? 'ml-auto' : 'mr-auto'} />
                    </div>
            }
        </>
    )
}
