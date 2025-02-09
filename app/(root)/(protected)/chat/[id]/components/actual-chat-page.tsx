
"use client";
import React, { useRef, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { io, Socket } from "socket.io-client";
import IMessage from "@/app/types/IMessage";
import MessageBubble from "./message-bubble";
import IUser from "@/app/types/IUser";
import { useToast } from "@/hooks/use-toast";
const hardcodedMessages = [
    {
        _id: "asldkfjsdlfj",
        conversation_id : "slfjadsflj",
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.`,
        sender_id: "other" as const,
        is_read : false,
        createdAt : new Date(), 
        updatedAt : new Date()
    },

];

export default function ActualChatPage({ me, user } : { me : IUser, user : IUser }) {
    const [ messages, set_messages ] = useState<Array<IMessage>>(hardcodedMessages);
    const { toast } = useToast();
    const chat_service_url = process.env.NEXT_PUBLIC_CHAT_SERVICE_URL;
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [ new_message, set_new_message ] = useState<string>("");
    const [socket, setSocket] = useState<Socket | null>(null);
    const chat_room_id = generate_chat_room_id(me._id, user._id);

    // Scroll to the bottom when the component mounts
    useEffect(() => {
        console.log("checking infinite loop from actual-chat-page.tsx");
        if (!chat_service_url) {
            console.error("Socket URL is undefined. Make sure NEXT_PUBLIC_CHAT_SERVICE_URL is set.");
            return;
        }
        const newSocket = io(chat_service_url);
        newSocket.emit("join_chat", chat_room_id);
        newSocket.on("new_message", handle_new_message);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [chat_service_url, chat_room_id]);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return (
        <div className="">
            {/* Header */}
            <div className="p-4">
                <div className="grid grid-cols-12 gap-2 items-center">
                    <Avatar className="col-span-2">
                        <AvatarImage src={user.profile?.secure_url || ""} alt="user profile" />
                        <AvatarFallback>{ (user.name || user.username)[0] }</AvatarFallback>
                    </Avatar>
                    <div className="col-span-10 font-bold text-2xl">{ user.name || user.username }</div>
                </div>
            </div>

            {/* Separator */}
            <Separator className="my-3" />

            {/* Chat Messages Container */}
            <div className="flex-1 overflow-y-auto px-4 space-y-4">
                {messages.map(message => (
                    <MessageBubble key={message._id} message={message} me={me} user={user} />
                ))}
                {/* Dummy element to scroll into view */}
                <div ref={messagesEndRef} />
            </div>

            {/* Chat Input (Hardcoded, no functionality) */}
            <div className="p-4 fixed left-0 bottom-0 w-full">
                <div className="flex items-stretch">
                    <input type="text" onChange={ (e) => set_new_message(e.target.value) } value={new_message} className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none" placeholder="Type your message..." />
                    <button onClick={ send_message } type="button" className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );

    function send_message() {
        console.log("sending message");
        const message : Partial<IMessage> = {
            sender_id : me._id, 
            message : new_message,  
        }
        if (socket) {
             socket?.emit('send_message' , { message, receiver_id : user._id, chat_room_id }); 
             set_new_message("");
        }
        else {
            toast({
                description : "something went wrong", 
                variant : "destructive"
            })
        }
    }

    function handle_new_message(arg : IMessage) {
        console.log("new message arrived", arg);
        set_messages(prev => [...prev, arg]);
    }
}
function generate_chat_room_id(user1_id: string, user2_id: string): string {
    return [user1_id, user2_id].sort().join("-");
}