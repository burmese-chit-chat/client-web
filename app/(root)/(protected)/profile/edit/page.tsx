export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import ProfileEditForm from "@/app/(root)/(protected)/profile/edit/components/form";
import { Separator } from "@/components/ui/separator";
import get_user from "../lib/get-user";
import get_user_data from "../lib/get-user-data";
import get_me from "@/app/lib/get-me";
import { redirect } from "next/navigation";

export default async function ProfileEdit() {
    const me = await get_me();
    if (!me) {
        redirect("/login");
        return;
    }
    const user = await get_user(me._id);
    const user_data = await get_user_data(me._id);
    return (
        <>
            <h1 className="font-bold text-2xl">Edit Your Profile</h1>
            <Separator className="my-4"></Separator>
            <div className="mb-10">
                <ProfileEditForm _id={me._id} name={user?.name || ""} age={user?.age || 18} gender={user?.gender || ""} region={user?.region || ""} status_message={user_data?.status_message || ""} about_me={user_data?.about_me || ""} interests={interests()} profile={user?.profile?.secure_url || ""}></ProfileEditForm>
            </div>
        </>
    );
    function interests(): Array<string> {
        return [user_data?.interests_1 || "", user_data?.interests_2 || "", user_data?.interests_3 || "", user_data?.interests_4 || "", user_data?.interests_5 || ""];
    }
}
