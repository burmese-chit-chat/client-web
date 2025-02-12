"use client";
import IUser from "@/app/types/IUser";
import React from "react";
import { io, Socket } from "socket.io-client";


interface IProps {
    me: IUser;
}

export default function ActiveSocket({ me }: IProps) {
    const [socket, setSocket] = React.useState<Socket | null>(null);
    const browse_service_url = process.env.NEXT_PUBLIC_BROWSE_SERVICE_URL;
    React.useEffect(() => {
        console.log("checking infinite loop from active-socket.tsx");
        if (!browse_service_url) {
            console.error("Socket URL is undefined. Make sure NEXT_PUBLIC_NOTIFICATION_SERVICE_URL is set.");
            return;
        }
        const newSocket = io(browse_service_url);
        window.onbeforeunload = () => {
            newSocket.emit("user_disconnected", me._id);
        };

        setSocket(newSocket);

        return () => {
            newSocket.emit("user_disconnected", me._id);
            newSocket.disconnect();
        };
    }, [browse_service_url, me._id]);
    return (
        <>{ set_user_to_active() }</>
    ) 
    function set_user_to_active() {
        socket?.emit("user_connected", me._id);
        return <></>;
    }
}
