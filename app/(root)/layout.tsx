export const dynamic = "force-dynamic"; // Force dynamic rendering
import React from "react";
import SideBar from "@/app/(root)/components/side-bar";
import get_me from "../lib/get-me";
import NotificationSocket from "./components/notification-socket";

export default async function layout({ children }: { children: React.ReactNode }) {
    const me = await get_me();
    if (me)
        return (
            <>
                <SideBar></SideBar>
                <NotificationSocket me={me} />
                <main>{children}</main>
            </>
        );
    else
        return (
            <>
                <SideBar></SideBar>
                <main>{children}</main>
            </>
        );
}
