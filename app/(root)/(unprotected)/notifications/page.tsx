import React from "react";
import AskingCard from "./component/asking-card";
import IUser from "@/app/types/IUser";
import get_me from "@/app/lib/get-me";
import get_notifications from "./lib/get-notifications";
import OneNotification from "./component/one-notification";
import Link from "next/link";

export default async function page() {
    const me: IUser | null = await get_me();
    if (me) {
        const notifications = await get_notifications(me._id);
        console.log(notifications);
        return (
            <>
                <AskingCard></AskingCard>
                {!!notifications.length ? (
                    <>
                        <div className="font-bold text-lg pb-2">Notifications</div>
                        <div className="my-5">
                            {notifications.map(item => (
                                <OneNotification key={item._id} notification={item} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div>Notifications not found</div>
                )}
            </>
        );
    } else
        return (
            <>
                <div>
                    please{" "}
                    <Link href={"/auth/login"} className="underline font-bold cursor-pointer">
                        LOGIN
                    </Link>{" "}
                    to see the notifications
                </div>
            </>
        );
}
