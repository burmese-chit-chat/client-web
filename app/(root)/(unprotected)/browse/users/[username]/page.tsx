export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import React, { Suspense } from "react";
import show_user_with_username from "./lib/show-user-with-username";
import GeneralInfo from "@/app/(root)/(protected)/profile/components/general-info";
import { Separator } from "@/components/ui/separator";
import get_me from "@/app/lib/get-me";
import { buttonVariants } from "@/components/ui/button";
import { MessageCircleMore, Pencil } from "lucide-react";
import Link from "next/link";
import DeleteProfileButton from "@/app/(root)/(protected)/profile/components/delete-profile-button";
import BrowseUsersUserData from "./components/UserData";
import ButtonWithLoader from "@/app/components/button-with-loader";
import create_chat_room from "./lib/create-chat-room-and-navigate-there";
import CopyToClipboard from "@/app/(root)/components/copy-to-clipboard";
type IProps = {
    params: Promise<{ username: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function page({ params }: IProps) {
    const { username } = await params;
    const me = await get_me();
    const user = await show_user_with_username(username);
    const base_url = process.env.BASE_URL || "";
    if (!user) {
        return <div>user not found</div>;
    }
    return (
        <>
            <div className="my-10">
                <div>
                    <GeneralInfo username={user.username} name={user?.name || ""} gender={user?.gender || ""} age={user?.age || undefined} region={user?.region || ""} _id={user._id} profile={user?.profile?.secure_url || ""} />
                    {me?._id && me._id === user._id ? (
                        <div className="mt-9 flex items-center justify-start gap-3 flex-wrap">
                            <Link href={`/profile/edit`} className={buttonVariants({ variant: "secondary" })}>
                                <Pencil />
                                Edit
                            </Link>

                            <DeleteProfileButton user_id={me._id} base_url={base_url} />
                            <CopyToClipboard show_icon show_text={false} text={`${base_url}/browse/users/${user.username}`} label="copy profile link" toast_text="profile link copied to clipboard" />
                        </div>
                    ) : (
                        <div className="mt-9 flex justify-start gap-3 items-center">
                            <ButtonWithLoader handler={create_chat_room} navigation_link={`/chat/${user._id}`} className="px-9 bg-blue-400 text-black" variant={"secondary"}>
                                <MessageCircleMore />
                                Chat
                            </ButtonWithLoader>
                            <CopyToClipboard show_icon show_text={false} text={`${base_url}/browse/users/${user.username}`} label="copy profile link" toast_text="profile link copied to clipboard" />
                        </div>
                    )}
                </div>
                <Separator className="my-9" />
                <div>
                    <Suspense fallback={<>Loading...</>}>
                        <BrowseUsersUserData user_id={user._id} />
                    </Suspense>
                </div>
            </div>
        </>
    );
}
export async function generateMetadata({ params }: IProps) {
    const { username } = await params;
    const user = await show_user_with_username(username);

    return {
        title: user?.name || user?.username || "User Profile",
        description: `age - ${user?.age || ""}, gender - ${user?.gender || ""}, region - ${user?.region || ""}`,
        openGraph: {
            images: [user?.profile?.secure_url || ""],
        },
    };
}
