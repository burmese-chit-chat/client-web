import IMessage from "@/app/types/IMessage";

async function get_messages_of_two_users(user1_id : string, user2_id : string) : Promise<Array<IMessage> | null> {
    try {
        const base_url = process.env.BASE_URL;
        const res = await fetch(`${base_url}/api/chat/messages/${user1_id}/${user2_id}`);
        const data = await res.json();
        if(data.status === 200) {
            const messages = data.data;
            return (messages as Array<IMessage>);
        }
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export default get_messages_of_two_users;