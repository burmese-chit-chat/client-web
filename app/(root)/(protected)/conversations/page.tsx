import React from "react";
import OneConversation from "./components/one-conversation";
import get_me from "@/app/lib/get-me";
import get_conversations from "./lib/get-conversations";
import { redirect } from "next/navigation";
import PaginationComponent from "@/app/components/pagination";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page({ searchParams }: { searchParams: SearchParams }) {
    const current_page = Number((await searchParams).page || 1);
    const me = await get_me();
    if (!me) redirect("/");
    const data = await get_conversations(me._id, current_page);
    if (data) {
        const { conversations, pagination } = data;
        console.log("conversations", conversations);
        console.log('pagination', pagination);
        return (
            <>
                <div className="space-y-3">{conversations && conversations.length ? conversations.map(item => <OneConversation key={item._id} conversation={item} me_id={me._id} />) : <div>No conversations found...</div>}</div>
                {(conversations.length && pagination ) && <PaginationComponent totalPages={pagination.total} currentPage={current_page} basePath="/conversations" maxDisplayed={2} />}
            </>
        );
    }
}
