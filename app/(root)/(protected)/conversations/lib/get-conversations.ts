
import IConversation from "@/app/types/IConversation";

async function get_conversations(user_id : string) : Promise<Array<IConversation> | null> {
    try {
        const base_url = process.env.BASE_URL;
        const res = await fetch(`${base_url}/api/chat/conversations/${user_id}`, { next : { revalidate : 0 }, cache : "no-store"});
        const data = await res.json();
        if(data.status === 200) {
            const conversations = data.data;
            return (conversations as Array<IConversation>);
        }
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export default get_conversations;