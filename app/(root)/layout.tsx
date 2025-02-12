export const dynamic = "force-dynamic"; // Force dynamic rendering
import React from "react";
import SideBar from "@/app/(root)/components/side-bar";
import get_me from "../lib/get-me";
import NotificationSocket from "./components/notification-socket";
import get_unread_notifications_count from "./lib/get-unread-notifications-count";

export default async function layout({ children }: { children: React.ReactNode }) {
    const me = await get_me();
    if (me) {
        const unread_notifications_count = await get_unread_notifications_count(me._id);
        return (
            <>
                <SideBar unread_notifications_count={unread_notifications_count} />
                <NotificationSocket me={me} />
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
