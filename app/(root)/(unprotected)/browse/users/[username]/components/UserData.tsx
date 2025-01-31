import IUser from "@/app/types/IUser";
import React from "react";
import { show_user_data_with_user_id } from "../lib/show-user-with-username";
import Interests from "@/app/(root)/(protected)/profile/components/interests";
import { Separator } from "@/components/ui/separator";
import LargeTexts from "@/app/(root)/(protected)/profile/components/large-texts";
interface IProps {
    user_id: IUser["_id"];
}
export default async function BrowseUsersUserData({ user_id }: IProps) {
    const base_url = process.env.BASE_URL || null;
    if (!base_url || !user_id) return <div>Something went wrong...</div>;
    const user_data = await show_user_data_with_user_id(user_id, base_url);
    if (!user_data) return <div>Something went wrong...</div>;

    return (
        <>
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
        </>
    );
    function interests_array(): Array<string> {
        return [user_data?.interests_1 || "", user_data?.interests_2 || "", user_data?.interests_3 || "", user_data?.interests_4 || "", user_data?.interests_5 || ""];
    }
}
