export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import React from "react";
import { Separator } from "@/components/ui/separator";
import GeneralInfo from "@/app/(root)/(protected)/profile/components/general-info";
import LargeTexts from "@/app/(root)/(protected)/profile/components/large-texts";
import { buttonVariants } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import get_me from "@/app/lib/get-me";
import Link from "next/link";
import Interests from "./components/interests";
import get_user from "@/app/(root)/(protected)/profile/lib/get-user";
import get_user_data from "./lib/get-user-data";
import DeleteProfileButton from "./components/delete-profile-button";
import { redirect } from "next/navigation";


export default async function Profile() {
    const me = await get_me();
    if(!me) { redirect("/login"); return; }
    const user = await get_user(me._id);
    const user_data = await get_user_data(me._id);
    const base_url = process.env.BASE_URL || "";
    return (
        <>
            <div className="mb-10">
                <div>
                    <GeneralInfo username={user?.username || ""} name={user?.name || ""} gender={user?.gender || ""} age={user?.age || ""} region={user?.region || ""} _id={me._id} profile={user?.profile?.secure_url || ""} />
                        <div className="mt-9 flex items-center justify-between">
                            <Link href={`/profile/edit`} className={buttonVariants({ variant: "secondary" })}>
                                <Pencil />
                                Edit
                            </Link>

                            <DeleteProfileButton user_id={me._id} base_url={base_url} />

                        </div>
                </div>
                <Separator className="my-5"></Separator>
                <div>
                    <Interests interests={interests_array()} />
                </div>
                <Separator className="my-5"></Separator>
                <div>
                    <LargeTexts title="Status Message" body={user_data?.status_message || "no data"} />
                </div>
                <Separator className="my-5"></Separator>
                <div>
                    <LargeTexts title="About Me" body={user_data?.about_me || "no data"} />
                </div>
            </div>
        </>
    );
    function interests_array(): Array<string> {
        return [user_data?.interests_1 || "", user_data?.interests_2 || "", user_data?.interests_3 || "", user_data?.interests_4 || "", user_data?.interests_5 || ""];
    }
}

