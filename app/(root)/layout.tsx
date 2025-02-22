import React from "react";
import SideBar from "@/app/(root)/components/side-bar";
import get_me from "../lib/get-me";
import NotificationSocket from "./components/notification-socket";
// import get_unread_notifications_count from "./lib/get-unread-notifications-count";
import ActiveSocket from "./components/active-socket";
import get_unread_conversations_count from "./lib/get-unread-conversations-count";

export default async function layout({ children }: { children: React.ReactNode }) {
    const me = await get_me();
    if (me) {
        // const unread_notifications_count = await get_unread_notifications_count(me._id);
        const unread_conversations_count = await get_unread_conversations_count(me._id);
        console.log('unread_conversations_count', unread_conversations_count);
        return (
            <>
                <SideBar unread_conversations_count={unread_conversations_count} />
                <NotificationSocket me={me} />
                <ActiveSocket me={me}/>
                <main>{children}</main>
            </>
        );
    } else
        return (
            <>
                <SideBar></SideBar>
                <main>{children}</main>
            </>
        );
}
