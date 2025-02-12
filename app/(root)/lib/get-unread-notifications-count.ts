async function get_unread_notifications_count (receiver_id : string) : Promise<number> {
    try {
        const base_url = process.env.BASE_URL;
        const response = await fetch(`${base_url}/api/notifications/count-unread/${receiver_id}`, { next : { revalidate : 0 }, cache : 'no-store' }); 
        const data = await response.json();
        if(data.status === 200) return data.data as number;
        else return 0;
    } catch(e) {
        console.log(e);
        return 0;
    }
}

export default get_unread_notifications_count;