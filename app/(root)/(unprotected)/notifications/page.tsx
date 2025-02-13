import React from "react";
import AskingCard from "./component/asking-card";
import IUser from "@/app/types/IUser";
import get_me from "@/app/lib/get-me";
import get_notifications from "./lib/get-notifications";
import OneNotification from "./component/one-notification";
import Link from "next/link";
import PaginationComponent from "@/app/components/pagination";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page({ searchParams }: { searchParams: SearchParams }) {
    const current_page = Number((await searchParams).page || 1);
    const me: IUser | null = await get_me();
    if (me) {
        const { notifications , pagination } = await get_notifications(me._id, current_page);
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
                        {(notifications.length && pagination ) && <PaginationComponent totalPages={pagination.total} currentPage={current_page} basePath="/notifications" maxDisplayed={2} />}
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
