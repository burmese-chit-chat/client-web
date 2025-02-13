
import IConversation from "@/app/types/IConversation";
import IPagination from "@/app/types/IPagination";

async function get_conversations(user_id : string, current_page : number) : Promise<{ conversations : Array<IConversation> , pagination : IPagination | null} | null> {
    try {
        const base_url = process.env.BASE_URL;
        const res = await fetch(`${base_url}/api/chat/conversations/${user_id}?page=${current_page}`, { next : { revalidate : 0 }, cache : "no-store"});
        const data = await res.json();
        if(data.status === 200) {
            const conversations = data.data as Array<IConversation>;
            return { conversations, pagination : data.pagination || null}
        }
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export default get_conversations;