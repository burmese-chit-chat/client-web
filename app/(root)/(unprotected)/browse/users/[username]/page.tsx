import React, { Suspense } from "react";
import show_user_with_username from "./lib/show-user-with-username";
import GeneralInfo from "@/app/(root)/(protected)/profile/[id]/components/general-info";
import { Separator } from "@/components/ui/separator";
import get_me from "@/app/lib/get-me";
import { Button, buttonVariants } from "@/components/ui/button";
import { BookMarked, Pencil } from "lucide-react";
import Link from "next/link";
import DeleteProfileButton from "@/app/(root)/(protected)/profile/[id]/components/delete-profile-button";
import BrowseUsersUserData from "./components/UserData";
type IProps = {
    params: Promise<{ username: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function page({ params }: IProps) {
    const { username } = await params;
    const me = await get_me();
    const user = await show_user_with_username(username);
    const base_url = process.env.BASE_URL || "";
    if(!user) {
        return <div>user not found</div>
    }
    return (
        <>
            <div className="my-10">
                <div>
                    <GeneralInfo username={user.username} name={user?.name || ""} gender={user?.gender || ""} age={user?.age || undefined} region={user?.region || ""} _id={user._id} profile={user?.profile?.secure_url || ""} />
                    {me?._id && me._id === user._id && (
                        <div className="mt-9 flex items-center justify-between">
                            <Link href={`/profile/${me._id}/edit`} className={buttonVariants({ variant: "secondary" })}>
                                <Pencil />
                                Edit
                            </Link>

                            <DeleteProfileButton user_id={me._id} base_url={base_url} />

                        </div>
                    )}
                    {me?._id && me._id !== user._id && (
                        <div className="mt-9">
                            <Button className="px-9 bg-green-400 text-black" variant="secondary">
                                <BookMarked />
                                Save User
                            </Button>
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
    )
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
