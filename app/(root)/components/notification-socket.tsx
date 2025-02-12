"use client";
import IUser from "@/app/types/IUser";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { refreshConversations } from "../(protected)/conversations/lib/actions";
import INotification from "@/app/types/INotification";
import { refreshNotifications } from "../(unprotected)/notifications/lib/actions";

interface IProps {
    me: IUser;
}

export default function NotificationSocket({ me }: IProps) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const notification_service_url = process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL;
    useEffect(() => {
        console.log("checking infinite loop from NotificationSocket.tsx");
        if (!notification_service_url) {
            console.error("Socket URL is undefined. Make sure NEXT_PUBLIC_NOTIFICATION_SERVICE_URL is set.");
            return;
        }
        const newSocket = io(notification_service_url);

        newSocket.on("received_notification", (data: INotification) => {
            console.log("getting new notification", data);
            sendNotification(data.title, {
                body: data.body,
            });
            refreshConversations();
            refreshNotifications();
        });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [notification_service_url]);

    return <>{set_user_id()}</>;

    function set_user_id() {
        socket?.emit("set_user_id", me._id);
        return <></>;
    }
}

function sendNotification(title: string, options?: NotificationOptions): void {
    if (Notification.permission === "granted") {
        new Notification(title, options);
    } else {
        console.log("Notification permission not granted.");
    }
}
