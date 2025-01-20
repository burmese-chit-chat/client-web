import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"
import Link from "next/link";

interface IProps {
    name? : string; 
    gender? : string; 
    age? : number; 
    region? : string;
    _id : string;
    username : string;
    profile : string
}
export default function GeneralInfo({ name, gender, age, region, username, profile } : IProps) {
    return (
        <>
            <div className="flex gap-3 items-center">
                <Link href={profile} target="_blank">
                    <Avatar className="w-[100px] h-[95px]">
                        <AvatarImage src={profile} alt="profile pic" />
                        <AvatarFallback>{ username[0] }</AvatarFallback>
                    </Avatar>
                </Link>
                <div>
                    <div>{name || username}&apos;s Profile</div>
                    <div className="mt-2 space-x-2">
                        { gender && <Badge variant="destructive">{gender}</Badge> }
                        { age && <Badge variant="outline">{age}</Badge> }
                        { region && <Badge variant="outline">{region}</Badge> }
                        
                    </div>
                    <div className="mt-3">
                        <span className="opacity-70">username - </span>
                        <span className="font-bold">{ username }</span>
                    </div>
                </div>
            </div>
        </>
    );
}
