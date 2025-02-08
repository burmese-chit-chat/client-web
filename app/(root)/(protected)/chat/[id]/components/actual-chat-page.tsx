
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

export default function ActualChatPage({ me } : { me : IUser }) {
    const { toast } = useToast();
    const chat_service_url = process.env.NEXT_PUBLIC_CHAT_SERVICE_URL;
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [ new_message, set_new_message ] = useState<string>("");
    const [socket, setSocket] = useState<Socket | null>(null);

    // Scroll to the bottom when the component mounts
    useEffect(() => {
        if (!chat_service_url) {
            console.error("Socket URL is undefined. Make sure NEXT_PUBLIC_CHAT_SERVICE_URL is set.");
            return;
        }
        const newSocket = io(chat_service_url);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [chat_service_url]);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return (
        <div className="">
            {/* Header */}
            <div className="p-4">
                <div className="grid grid-cols-12 gap-2 items-center">
                    <Avatar className="col-span-2">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="col-span-10 font-bold text-2xl">Khine</div>
                </div>
            </div>

            {/* Separator */}
            <Separator className="my-3" />

            {/* Chat Messages Container */}
            <div className="flex-1 overflow-y-auto px-4 space-y-4">
                {hardcodedMessages.map(message => (
                    <MessageBubble key={message._id} message={message} />
                ))}
                {/* Dummy element to scroll into view */}
                <div ref={messagesEndRef} />
            </div>

            {/* Chat Input (Hardcoded, no functionality) */}
            <div className="p-4 fixed left-0 bottom-0 w-full">
                <div className="flex items-stretch">
                    <input type="text" onChange={ (e) => set_new_message(e.target.value) } value={new_message} className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none" placeholder="Type your message..." defaultValue="Type something..." />
                    <button onClick={ send_message } type="button" className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );

    function send_message() {
        const message : Partial<IMessage> = {
            sender_id : me._id, 
            message : new_message,  
        }
        if (socket) {
             socket?.emit('send_message' , message); 
        }
        else {
            toast({
                description : "something went wrong", 
                variant : "destructive"
            })
        }
    }


}