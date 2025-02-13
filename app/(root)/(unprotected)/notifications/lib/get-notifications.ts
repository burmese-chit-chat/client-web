import INotification from "@/app/types/INotification";
import IPagination from "@/app/types/IPagination";

async function get_notifications (receiver_id : string, current_page : number) : Promise<{ notifications : Array<INotification>, pagination : IPagination | null }> {
    try {
        const base_url = process.env.BASE_URL;
        const response = await fetch(`${base_url}/api/notifications/${receiver_id}?page=${current_page}`); 
        const data = await response.json();
        if(data.status === 200) return { notifications : (data.data) as Array<INotification> ,pagination : (data.pagination) as IPagination || null };
        else return { notifications : [], pagination : null }
    } catch (e) {
        console.log("error fetching notifications", e);
        return { notifications : [], pagination : null }
    }
}

export default get_notifications;