import get_me from "@/app/lib/get-me";
import ActualChatPage from "./components/actual-chat-page";
import { redirect } from "next/navigation";

export default async function ChatPage() {
    const me = await get_me()
    if(!me) redirect('/');

    return (
        <>
           <ActualChatPage me={me} /> 
        </>
    )
}


