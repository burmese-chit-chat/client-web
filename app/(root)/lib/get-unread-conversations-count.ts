
async function get_unread_conversations_count (user_id : string) : Promise<number> {
    try {
        const base_url = process.env.BASE_URL;
        const response = await fetch(`${base_url}/api/chat/conversations/${user_id}/count-unread`, { next : { revalidate : 0 }, cache : 'no-store' }); 
        const data = await response.json();
        if(data.status === 200) return data.data as number;
        else return 0;
    } catch(e) {
        console.log(e);
        return 0;
    }
}

export default get_unread_conversations_count;