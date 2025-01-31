import get_me from "@/app/lib/get-me";
import IUser from "@/app/types/IUser";
import { redirect } from "next/navigation";
import React from "react";

export default async function layout({ children }: { children: React.ReactNode }) {
    const user : IUser | null = await get_me();
    console.log('user from protected layout', user);
    if(!user) redirect("/auth/login");
    return <>{children}</>;
}
