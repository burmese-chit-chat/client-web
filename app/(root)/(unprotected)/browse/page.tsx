import React from "react";
import { browse_all_users } from "./lib/users";
import GeneralInfo from "../../(protected)/profile/components/general-info";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import PaginationComponent from "@/app/components/pagination";
import SearchForm from "./components/search-form";
import IUser from "@/app/types/IUser";
import { EnumGender } from "@/app/types/TGenders";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function BrowsePage({ searchParams }: { searchParams: SearchParams }) {
    const currentPage = Number((await searchParams).page || 1);
    const current_search_keyword = String((await searchParams).search || "");
    const gender : EnumGender | null = (await searchParams).gender ? String((await searchParams).gender) as EnumGender : null;
    // console.log("current page", currentPage);
    const { users, pagination } = await browse_all_users(currentPage, current_search_keyword, gender);
    console.log('the users', users);
    return (
        <>
            <h1 className="font-bold uppercase mb-4">Our lovely users</h1>
            <div>
                <SearchForm gender={gender} page={currentPage} keyword={current_search_keyword} />
            </div>
            {!users.length && <div className="opacity-80 my-4">No users found...</div>}
            <div>
                {!!users.length && (
                    <div className="mt-4 space-y-4">
                        {!!users.length &&
                            users.map((item: IUser, i: number) => (
                                <div key={item._id}>
                                    <Link href={`browse/users/${item.username}`} className="flex items-center justify-between pe-3">
                                        <GeneralInfo _id={item._id} username={item.username} name={item?.name || item.username} profile={item?.profile?.secure_url || ""} gender={item?.gender} age={item?.age} region={item?.region} open_profile={false} />
                                        { item.is_active && <div className="w-2 h-2 rounded-full bg-green-500"></div> }
                                    </Link>
                                    {users.length !== i + 1 && <Separator className="mt-4"></Separator>}
                                </div>
                            ))}
                    </div>
                )}
            </div>
            <Separator className="my-4" />
            {!!users.length && <PaginationComponent search_keyword={current_search_keyword} totalPages={pagination.total} currentPage={currentPage} basePath="/browse" maxDisplayed={2} />}
        </>
    );
}
