import get_me from "@/app/lib/get-me";
import IUser from "@/app/types/IUser";
import { redirect } from "next/navigation";
import React from "react";

export default async function layout({ children }: { children: React.ReactNode }) {
    const user : IUser | null = await get_me();
    if(!user) redirect("/auth/register");
    return <>{children}</>;
}
