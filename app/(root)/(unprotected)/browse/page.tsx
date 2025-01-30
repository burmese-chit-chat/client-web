import React from "react";
import { browse_all_users } from "./lib/users";
import GeneralInfo from "../../(protected)/profile/[id]/components/general-info";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function BrowsePage() {
    const users = await browse_all_users();
    return (
        <>
            <h1 className="font-bold uppercase">Our lovely users</h1>
            {!users.length && <div className="opacity-80">No users found...</div>}
            {!!users.length && (
                <div className="mt-4 space-y-4">
                    {!!users.length &&
                        users.map((item, i) => (
                            <Link href={`browse/users/${item.username}`} className="block" key={item._id}>
                                <GeneralInfo
                                  _id={item._id}
                                  username={item.username}
                                  name={item?.name || item.username}
                                  profile={item?.profile?.secure_url || ""}
                                  gender={item?.gender}
                                  age={item?.age}
                                  region={item?.region}
                                  open_profile={false}
                                />
                                { users.length !== i + 1 && (<Separator className="mt-2"></Separator>)}
                            </Link>
                            
                        ))}
                </div>
            )}
        </>
    );
}
