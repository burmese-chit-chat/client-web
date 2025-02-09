import get_me from "@/app/lib/get-me";
import ActualChatPage from "./components/actual-chat-page";
import { redirect } from "next/navigation";
import get_user from "../../profile/lib/get-user";
import get_messages_of_two_users from "./lib/get-messages";

interface IProps {
    params : Promise<{id : string}>
}
export default async function ChatPage({ params } : IProps) {
    const me = await get_me();
    const { id } = await params;
    const user = await get_user(id);
    if(!me || !user) redirect('/');

    const messages = await get_messages_of_two_users(me._id, user._id);
    console.log("messages", messages);
    if(!messages) return (<div>Something went wrong....</div>)

    return (
        <>
           <ActualChatPage me={me} user={user} prop_messages={messages} /> 
        </>
    )
}


