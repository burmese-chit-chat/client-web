import get_me from "@/app/lib/get-me";
import ActualChatPage from "./components/actual-chat-page";
import { redirect } from "next/navigation";
import get_user from "../../profile/lib/get-user";

interface IProps {
    params : Promise<{id : string}>
}
export default async function ChatPage({ params } : IProps) {
    const me = await get_me();
    const { id } = await params;
    const user = await get_user(id);
    if(!me || !user) redirect('/');

    const user_ids = [me._id, user._id];
    console.log("user_ids", user_ids);

    return (
        <>
           <ActualChatPage me={me} user={user} /> 
        </>
    )
}


