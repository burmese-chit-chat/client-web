import INotification from "@/app/types/INotification";

async function get_notifications (receiver_id : string) : Promise<Array<INotification>> {
    try {
        const base_url = process.env.BASE_URL;
        const response = await fetch(`${base_url}/api/notifications/${receiver_id}`); 
        const data = await response.json();
        if(data.status === 200) return data.data;
        else return [];
    } catch (e) {
        console.log("error fetching notifications", e);
        return [];
    }
}

export default get_notifications;