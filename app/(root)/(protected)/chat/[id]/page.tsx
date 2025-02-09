import get_me from "@/app/lib/get-me";
import ActualChatPage from "./components/actual-chat-page";
import { redirect } from "next/navigation";
import get_user from "../../profile/lib/get-user";
import get_messages_of_two_users from "./lib/get-messages";
import IMessage from "@/app/types/IMessage";
import IUser from "@/app/types/IUser";
import axios from "axios";

interface IProps {
    params: Promise<{ id: string }>;
}
export default async function ChatPage({ params }: IProps) {
    const me = await get_me();
    const { id } = await params;
    const user = await get_user(id);
    if (!me || !user) redirect("/");

    const messages = await get_messages_of_two_users(me._id, user._id);
    console.log("messages", messages);
    if (!messages) return <div>Something went wrong....</div>;
    if (messages.length && messages.length > 0) await update_latest_message_is_read(messages[messages.length - 1], me);

    return (
        <>
            <ActualChatPage me={me} user={user} prop_messages={messages} />
        </>
    );

    async function update_latest_message_is_read(last_message: IMessage, me: IUser) {
        try {
            if (last_message.sender_id === me._id) return;
            if (last_message.is_read) return;
            console.log("updating, latest message's seen");
            const api_url = process.env.API_URL;
            const res = await axios.put(`${api_url}/chat/messages/is_read/${last_message._id}`);
            console.log(res.data.data);
        } catch (e) {
            console.log(e);
        }
    }
}
