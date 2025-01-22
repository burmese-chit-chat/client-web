import React from "react";
import { Separator } from "@/components/ui/separator";
import GeneralInfo from "@/app/(root)/(protected)/profile/[id]/components/general-info";
import LargeTexts from "@/app/(root)/(protected)/profile/[id]/components/large-texts";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pencil, BookMarked } from "lucide-react";
import get_me from "@/app/lib/get-me";
import Link from "next/link";
import Interests from "./components/interests";
import get_user from "@/app/(root)/(protected)/profile/[id]/lib/get-user";
import get_user_data from "./lib/get-user-data";

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Profile({ params }: Props) {
    const me = await get_me();
    const { id } = await params;
    const user = await get_user(id);
    const user_data = await get_user_data(id);
    return (
        <>
            <div className="mb-10">
                <div>
                    <GeneralInfo username={user?.username || ''} name={user?.name || ''} gender={user?.gender || ''} age={user?.age || ''} region={user?.region || ''} _id={id} profile={user?.profile?.secure_url || ''}  />
                    {me?._id && me._id === id && (
                        <div className="mt-4">
                            <Link href={`/profile/${id}/edit`} className={buttonVariants({ variant: "secondary" })}>
                                <Pencil />
                                Edit
                            </Link>
                        </div>
                    )}
                    {me?._id && me._id !== id && (
                        <div className="mt-4">
                            <Button className="px-9 bg-green-400 text-black" variant="secondary">
                                <BookMarked />
                                Save User
                            </Button>
                        </div>
                    )}
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
        return [
            user_data?.interests_1 || '',
            user_data?.interests_2 || '',
            user_data?.interests_3 || '',
            user_data?.interests_4 || '',
            user_data?.interests_5 || '',
        ];
    }
}


export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    const user = await get_user(id);

    return {
        title : user?.name || user?.username || 'User Profile', 
        description : `age - ${user?.age || ''}, gender - ${user?.gender || ''}, region - ${user?.region || ''}`, 
        openGraph: {
            images : [user?.profile?.secure_url || '']
        }
    }
}
