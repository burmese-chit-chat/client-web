"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ThemeToggle from "@/app/components/theme-toggle";
import { AlignJustify, Bell, MessageCircle } from "lucide-react";
import axios from "axios";
// import { useRouter } from "next/navigation";
import EnumGlobals from "@/app/types/EnumPlatformName";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface IProps {
    unread_notifications_count? : number;
}

export default function SideBar({ unread_notifications_count = 0 } : IProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    console.log("in side bar", unread_notifications_count);
    // const router = useRouter();
    const closeSheet = () => setIsOpen(false);
    return (
        <header className="py-4">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <h1 className=" uppercase font-bold">{ EnumGlobals.platform_name }</h1>
                </Link>
                <div className="flex gap-5 items-center">
                    <ThemeToggle></ThemeToggle>
                    <div onClick={ () => { router.push('/conversations') }} className="relative cursor-pointer">
                        <MessageCircle className="w-7 h-7"/>
                        {/* <div className="absolute -bottom-1 -right-0 bg-orange-500 w-3 h-3 rounded-full"></div> */}
                    </div>
                    <div onClick={() => { router.push('/notifications') }} className="relative">
                        <Bell className="w-7 h-7"/>
                        { !!unread_notifications_count && <Badge className="bg-orange-400 rounded-full absolute -bottom-2 -right-3">{ unread_notifications_count }</Badge> }
                        
                    </div>
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger>
                            <AlignJustify />
                        </SheetTrigger>
                        <SheetContent aria-describedby="dialog-description">
                            <SheetHeader>
                                <SheetTitle>Navigation Menu</SheetTitle>
                            </SheetHeader>
                            <Separator className="my-6"></Separator>
                            <div>
                                <ul>
                                    <Link href="/" onClick={closeSheet}>
                                        <li className="hover:bg-slate-500 p-4 text-gray-800 rounded-sm">
                                            <span>Home</span>
                                        </li>
                                    </Link>
                                    <Separator className="my-4"></Separator>
                                    <Link href={`/profile`} onClick={closeSheet}>
                                        <li className="hover:bg-slate-500 p-4 text-gray-800 rounded-sm">
                                            <span>Profile</span>
                                        </li>
                                    </Link>
                                    <Separator className="my-4"></Separator>
                                    <Link href={`/browse`} onClick={closeSheet}>
                                        <li className="hover:bg-slate-500 p-4 text-gray-800 rounded-sm">
                                            <span>Browse</span>
                                        </li>
                                    </Link>
                                    <Separator className="my-4"></Separator>
                                    <li className="hover:bg-slate-500 p-4 text-gray-800 rounded-sm">
                                        <button type="button" onClick={logout}>Logout</button>
                                    </li>
                                    <Separator className="my-4"></Separator>
                                </ul>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
            <Separator className="mt-3 h-[3px] bg-white"></Separator>
        </header>
    );

    async function logout () {
        try {
            const response = await axios.get('/api/auth/logout');
            console.log(response.data); 
            if(response.status === 200) {
                // router.push("/auth/login");
                window.location.href="/auth/login";
            }
        } catch (e) {
            console.log(e);
        }
    }
}
