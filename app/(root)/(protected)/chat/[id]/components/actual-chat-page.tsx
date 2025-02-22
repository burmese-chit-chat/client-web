"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { io, Socket } from "socket.io-client";
import IMessage from "@/app/types/IMessage";
import MessageBubble from "./message-bubble";
import IUser from "@/app/types/IUser";
import { useToast } from "@/hooks/use-toast";
import { refreshConversations } from "../../../conversations/lib/actions";
import axios from "axios";

export default function ActualChatPage({ me, user, prop_messages }: { me: IUser; user: IUser; prop_messages: Array<IMessage> }) {
    const scroll_ref = React.useRef<HTMLDivElement>(null);
    const [messages, set_messages] = useState<Array<IMessage>>(prop_messages);
    const [loading_older, set_loading_older] = useState<boolean>(false);
    const { toast } = useToast();
    const chat_service_url = process.env.NEXT_PUBLIC_CHAT_SERVICE_URL;
    const [new_message, set_new_message] = useState<string>("");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [notification_socket, set_notification_socket] = useState<Socket | null>(null);
    const chat_room_id = generate_chat_room_id(me._id, user._id);
    const update_seen_based_on_sender = useMemo(get_update_seen_based_on_sender_function, [me._id]);
    const notification_service_url = process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL;
    const handle_new_message = useMemo(get_handle_new_message_function, [me._id, me.username, me.name, notification_socket, user._id]);

    useEffect(() => {
        console.log("checking infinite loop from actual-chat-page.tsx");
        if (!chat_service_url) {
            console.error("Socket URL is undefined. Make sure NEXT_PUBLIC_CHAT_SERVICE_URL is set.");
            return;
        }
        const newSocket = io(chat_service_url);
        newSocket.emit("join_chat", chat_room_id);
        newSocket.on("new_message", async (arg: IMessage) => {
            handle_new_message(arg);
            if (newSocket.connected) await update_seen_based_on_sender(arg);
        });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [chat_service_url, chat_room_id, update_seen_based_on_sender, handle_new_message]);

    useEffect(() => {
        console.log("checking infinite loop from actual-chat-page.tsx");
        if (!notification_service_url) {
            console.error("Socket URL is undefined. Make sure NEXT_PUBLIC_NOTIFICATION_SERVICE_URL is set.");
            return;
        }
        const newSocket = io(notification_service_url);
        set_notification_socket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, [notification_service_url]);

    useEffect(() => {
        console.log("checking infinite loop from actual-chat-page.tsx");
        refreshConversations();
        scroll_to_bottom();
    }, []);

    return (
        <div className="">
            {/* Header */}
            <div className="p-4">
                <div className="flex justify-start items-center gap-6">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={user.profile?.secure_url || ""} alt="user profile" />
                        <AvatarFallback>{(user.name || user.username)[0]}</AvatarFallback>
                    </Avatar>
                    <div className="font-bold text-3xl">{user.name || user.username}</div>
                </div>
            </div>

            {/* Separator */}
            <Separator className="my-3" />

            {/* Chat Messages Container */}
            <div className="flex-1 overflow-y-auto px-4 space-y-4 h-[62vh]">
                <div onClick={load_more} className="text-center text-gray-400 cursor-pointer hover:bg-gray-700">
                    {loading_older ? "loading..." : "load more"}
                </div>
                {messages.map(message => (
                    <MessageBubble key={message._id} message={message} me={me} user={user} />
                ))}
                <div className="h-10 w-full"></div>
                <div ref={scroll_ref} className="w-full"></div>
            </div>

            {/* Chat Input (Hardcoded, no functionality) */}
            <div className="p-4 w-full">
                <div className="flex items-stretch justify-start">
                    <input type="text" onChange={e => set_new_message(e.target.value)} value={new_message} className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none" placeholder="Type your message..." />
                    <button onClick={send_message} type="button" className="bg-gray-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );

    function send_message() {
        console.log("sending message");
        const message: Partial<IMessage> = {
            sender_id: me._id,
            message: new_message,
        };
        if (socket) {
            socket?.emit("send_message", { message, receiver_id: user._id, chat_room_id });
            set_new_message("");
            refreshConversations();
        } else {
            toast({
                description: "something went wrong",
                variant: "destructive",
            });
        }
    }
    function scroll_to_bottom() {
        if (scroll_ref.current) {
            console.log("SCROLLING TO BOTTOM");
            scroll_ref.current.scrollIntoView({ behavior: "smooth" });
            // scroll_ref.current.scrollTop = scroll_ref.current.scrollHeight;
        }
    }

    function get_handle_new_message_function() {
        return function (arg: IMessage) {
            console.log("new message arrived", arg);
            notification_socket?.emit("send_notification", {
                sender_id: me._id,
                receiver_id: user._id,
                title: `${me.name || me.username || "a user"} sent you a new message`,
                body: arg.message,
            });
            set_messages(prev => [...prev, arg]);
            scroll_to_bottom();
        };
    }

    function get_update_seen_based_on_sender_function() {
        return async function (message: IMessage) {
            try {
                if (me._id === message.sender_id) return;
                console.log("updating seen...");
                const api_url = process.env.NEXT_PUBLIC_API_URL;
                const res = await axios.put(`${api_url}/chat/messages/is_read/${message._id}`);
                console.log(res.data.data);
            } catch (e) {
                console.log(e);
            }
        };
    }

    async function load_more() {
        try {
            set_loading_older(true);
            const lastMessage = messages[0];
            const base_url = process.env.NEXT_PUBLIC_BASE_URL;
            const res = await fetch(`${base_url}/api/chat/messages/${me._id}/${user._id}?before=${lastMessage._id}`);
            const data = await res.json();
            if (data.data.length === 0) {
                toast({
                    description: "no more messages left",
                });
            }
            set_messages(prev => [...data.data, ...prev]);
            console.log(data);
        } catch (e) {
            console.log(e);
        } finally {
            set_loading_older(false);
        }
    }
}

function generate_chat_room_id(user1_id: string, user2_id: string): string {
    return [user1_id, user2_id].sort().join("-");
}
