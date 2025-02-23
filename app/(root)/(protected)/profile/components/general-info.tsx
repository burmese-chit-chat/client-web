"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EnumGender } from "@/app/types/TGenders";

interface IProps {
    name?: string;
    gender?: string;
    age?: number;
    region?: string;
    _id: string;
    username: string;
    profile: string;
    open_profile?: boolean;
}
export default function GeneralInfo({ name, gender, age, region, username, profile, open_profile = true }: IProps) {
    return (
        <>
            <div className="flex w-full text-sm gap-4 items-center">
                <div
                    className="w-fit"
                    onClick={() => {
                        if (open_profile) open_external_link(profile);
                    }}
                >
                    <Avatar className="w-full aspect-square">
                        <AvatarImage className="w-auto h-auto aspect-square rounded-full" src={profile} alt="profile pic" />
                        <AvatarFallback>{username[0]}</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div className="text-lg font-bold">{name || username}</div>
                    <div className="mt-2 space-x-2">
                        {gender && <Badge variant="default" className={ gender === EnumGender.female ? 'bg-green-500' : 'bg-red-500' }>{gender}</Badge>}
                        {age && <Badge variant="outline">{age}</Badge>}
                        {region && <Badge variant="outline">{region}</Badge>}
                    </div>
                    {open_profile && (
                        <div className="mt-3">
                            <span className="opacity-70">username - </span>
                            <span className="font-bold">{username}</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function open_external_link(url: string) {
    if (!url) return;
    if (typeof window !== "undefined") {
        window.open(url, "_blank", "noopener,noreferrer");
    }
}
