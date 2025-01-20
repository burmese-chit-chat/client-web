"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ThemeToggle from "@/app/components/theme-toggle";
import { AlignJustify } from "lucide-react";
import axios from "axios";
// import { useRouter } from "next/navigation";
import EnumGlobals from "@/app/types/EnumPlatformName";
interface IProps {
    user_id: string;
}

export default function SideBar({ user_id }: IProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // const router = useRouter();
    const closeSheet = () => setIsOpen(false);
    return (
        <header className="py-4">
            <nav className="flex justify-between items-center">
                <h1 className=" uppercase font-bold">{ EnumGlobals.platform_name }</h1>
                <div className="flex gap-4">
                    <ThemeToggle></ThemeToggle>
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
                                    <Link href={`/profile/${user_id}`} onClick={closeSheet}>
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
