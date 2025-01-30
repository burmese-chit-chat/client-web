import React from "react";
import { browse_all_users } from "./lib/users";
import GeneralInfo from "../../(protected)/profile/[id]/components/general-info";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import PaginationComponent from "@/app/components/pagination";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function BrowsePage({ searchParams } : { searchParams: SearchParams }) {
    const currentPage = Number((await searchParams).page) || 1;
    console.log("current page", currentPage);
    const users = await browse_all_users();
    return (
        <>
            <h1 className="font-bold uppercase">Our lovely users</h1>
            {!users.length && <div className="opacity-80">No users found...</div>}
            <div>
                {!!users.length && (
                    <div className="mt-4 space-y-4">
                        {!!users.length &&
                            users.map((item, i) => (
                                <Link href={`browse/users/${item.username}`} className="block" key={item._id}>
                                    <GeneralInfo _id={item._id} username={item.username} name={item?.name || item.username} profile={item?.profile?.secure_url || ""} gender={item?.gender} age={item?.age} region={item?.region} open_profile={false} />
                                    {users.length !== i + 1 && <Separator className="mt-2"></Separator>}
                                </Link>
                            ))}
                    </div>
                )}
            </div>
            <Separator className="my-4" />
            <PaginationComponent totalPages={10} currentPage={currentPage} basePath="/browse" maxDisplayed={2} />
        </>
    );
}
