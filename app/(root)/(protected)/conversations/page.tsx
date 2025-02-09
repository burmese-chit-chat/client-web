import React from "react";
import OneConversation from "./components/one-conversation";
import get_me from "@/app/lib/get-me";
import get_conversations from "./lib/get-conversations";
import { redirect } from "next/navigation";

export default async function page() {
    const me = await get_me();
    if (!me) redirect("/");
    const conversations = await get_conversations(me?._id);
    console.log("conversations", conversations);
    return (
        <>
            <div className="space-y-3">
                {conversations && conversations.length ? (
                    conversations.map(item => (
                        <OneConversation key={item._id} conversation={item} me_id={me._id} />
                    ))
                ) : (
                    <div>No conversations found...</div>
                )}
            </div>
        </>
    );
}
