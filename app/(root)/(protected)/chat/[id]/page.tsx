"use client";
import React, { useRef, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { io, Socket } from "socket.io-client";

const hardcodedMessages = [
    {
        id: 1,
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.`,
        sender: "other" as const,
    },
    {
        id: 2,
        text: `Cras ultricies ligula sed magna dictum porta. Nulla quis lorem ut libero malesuada feugiat.`,
        sender: "me" as const,
    },
    {
        id: 3,
        text: `Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada.`,
        sender: "other" as const,
    },
    {
        id: 4,
        text: `Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.`,
        sender: "me" as const,
    },
    {
        id: 5,
        text: `Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.`,
        sender: "me" as const,
    },
    {
        id: 6,
        text: `Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.`,
        sender: "me" as const,
    },
    {
        id: 7,
        text: `Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.`,
        sender: "me" as const,
    },
    {
        id: 8,
        text: `Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.`,
        sender: "me" as const,
    },
];

export default function ChatPage() {
    const chat_service_url = process.env.NEXT_PUBLIC_CHAT_SERVICE_URL;
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    console.log(socket);

    // Scroll to the bottom when the component mounts
    useEffect(() => {
        if (!chat_service_url) {
            console.error("Socket URL is undefined. Make sure NEXT_PUBLIC_CHAT_SERVICE_URL is set.");
            return;
        }
        const newSocket = io(chat_service_url);
        setSocket(newSocket);
        newSocket.on("connect", () => {
            console.log("Connected with socket id:", newSocket.id);
        });
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

        return () => {
            newSocket.disconnect();
        };
    }, [chat_service_url]);

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="p-4 border-b border-gray-300">
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
                    <MessageBubble key={message.id} message={message} />
                ))}
                {/* Dummy element to scroll into view */}
                <div ref={messagesEndRef} />
            </div>

            {/* Chat Input (Hardcoded, no functionality) */}
            <div className="p-4 border-t border-gray-300">
                <div className="flex items-center">
                    <input type="text" className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none" placeholder="Type your message..." defaultValue="Type something..." readOnly />
                    <button onClick={ () => { socket?.emit('send_message' , 'hello'); } } type="button" className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

interface Message {
    id: number;
    text: string;
    sender: "me" | "other";
}

interface MessageBubbleProps {
    message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
    // Check sender to determine layout
    const isSentByMe = message.sender === "me";

    return (
        <div className={`grid grid-cols-12 gap-3 items-end ${isSentByMe ? "justify-end" : "justify-start"}`}>
            {/* If the message is received, show avatar on the left */}
            {!isSentByMe && (
                <Avatar className="col-span-2">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            )}
            <Card className={`${isSentByMe ? "col-span-8 col-start-5 bg-blue-950 text-white" : "col-span-8 bg-slate-500 text-white"} rounded-md`}>
                <CardContent className="p-3 text-left whitespace-pre-wrap">{message.text}</CardContent>
            </Card>
        </div>
    );
}
