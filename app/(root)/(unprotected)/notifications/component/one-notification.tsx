"use client";
import INotification from "@/app/types/INotification";
import { Loader2 } from "lucide-react";
import React from "react";
interface IProps {
    notification: INotification;
}
export default function OneNotification({ notification }: IProps) {
    const [loading, set_loading] = React.useState<boolean>(false);
    return (
        <div onClick={handle_click} className="border-b border-gray-800 py-3 px-2 flex justify-between items-center hover:bg-gray-900 cursor-pointer">
            <div>
                <div className={`font-bold ${notification.is_read ? "text-gray-600" : ""}`}>{notification.title}</div>
                <div className="text-sm text-gray-600">{notification.body}</div>
            </div>
            {loading && <Loader2 className="animate-spin" />}
            {!notification.is_read && <div className="w-3 h-3 bg-orange-500 rounded-full"></div>}
        </div>
    );

    async function handle_click() {
        try {
            set_loading(true);
            if (!notification.is_read) {
                const base_url = process.env.NEXT_PUBLIC_BASE_URL;
                const response = await fetch(`${base_url}/api/notifications/is-read/${notification._id}`, { next: { revalidate: 0 } });
                const data = await response.json();
                console.log(data);
            }
            window.location.href=`/chat/${notification.sender_id}`
        } catch (e) {
            console.log(e);
        } finally {
            set_loading(false);
        }
    }
}
