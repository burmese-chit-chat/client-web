"use client";
import IConversation from "@/app/types/IConversation";
import IUser from "@/app/types/IUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import get_user from "../../profile/lib/get-user";
import { useRouter } from 'next/navigation'
interface IProps {
    conversation: IConversation;
    me_id: IUser["_id"];
}

export default function OneConversation(props: IProps) {
    const router = useRouter();
    const [loading, set_loading] = useState<boolean>(false);
    const [user, set_user] = useState<IUser>({} as IUser);
    const [navigation_loading, set_navigation_loading] = useState<boolean>(false);
    const [ error, set_error ] = useState<boolean>(false);
    const fetch_user = useMemo(get_fetch_user_function, [props.conversation.members, props.me_id])
    useEffect(() => {
        console.log("checking infinite loop from one-conversation");
        fetch_user();
    }, [fetch_user]);
    if(error) return <></>;
    return (
        <>
            {!loading ? (
                <div onClick={go_to_chat_page} className="grid grid-cols-12 border-b border-gray-400 py-2 px-1 hover:bg-gray-400 rounded-t-md focus:bg-gray-400 cursor-pointer">
                    <Avatar className="col-span-2">
                        <AvatarImage src={user.profile?.secure_url || ""}></AvatarImage>
                        <AvatarFallback>{(user.name || user.username)?.[0] || "u"}</AvatarFallback>
                    </Avatar>
                    <div className="flex justify-between col-span-10">
                        <div>
                            <div className="mb-2 text-lg font-bold">{user.name || user.username}</div>
                            <div className={`text-sm ${get_is_read() ? 'text-gray-700' : 'text-white font-bold'}`}>{text_cut(props.conversation.last_message.message)}</div>
                        </div>
                        <div className="w-7 h-7">{navigation_loading && <LoaderCircle className=" animate-spin" />}</div>
                    </div>
                </div>
            ) : (
                <div className="border-b border-gray-400 py-5">
                    <LoaderCircle className="animate-spin ms-5" />
                </div>
            )}
        </>
    );

    function get_fetch_user_function() {
        return async function () {
            try {
                set_loading(true);
                const user = await get_user(get_other_user_id(props.me_id, props.conversation.members), true);
                set_user(user);
                console.log("user", user);
            } catch (e) {
                console.log(e);
                set_error(true)
            } finally {
                set_loading(false);
            }
        };
    }
    function go_to_chat_page() {
        try {
            set_navigation_loading(true);
            router.push(`/chat/${get_other_user_id(props.me_id, props.conversation.members)}`);
        } catch (e) {
            console.log(e);
        } 
    }

    function get_is_read () {
        return props.conversation.last_message.sender_id === props.me_id ? true : props.conversation.last_message.is_read;
    }
}

function text_cut(text: string): string {
    const length_limit = 35;
    if (text.length < length_limit) return text;
    return `${text.substring(0, length_limit)}...`;
}

function get_other_user_id(me_id: string, ids: Array<string>): string {
    const other_user_id = ids.find(item => item !== me_id);
    return other_user_id || "";
}
