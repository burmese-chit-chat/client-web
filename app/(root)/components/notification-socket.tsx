"use client";
import IUser from "@/app/types/IUser";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { refreshConversations } from "../(protected)/conversations/lib/actions";
import INotification from "@/app/types/INotification";
import { refreshMessages } from "../(protected)/chat/[id]/lib/actions";

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
            refreshConversations();
            if (data.sender_id !== me._id) refreshMessages(data.sender_id);
        });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [notification_service_url, me._id]);

    return <>{set_user_id()}</>;

    function set_user_id() {
        socket?.emit("set_user_id", me._id);
        return <></>;
    }
}
