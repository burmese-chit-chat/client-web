import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"
import Link from "next/link";

interface IProps {
    name : string; 
    gender : string; 
    age : number; 
    region : string;
    _id : string;
    username : string;
}
export default function GeneralInfo({ name, gender, age, region, username } : IProps) {
    return (
        <>
            <div className="flex gap-3 items-center">
                <Link href="https://i.postimg.cc/hGJMZPhV/6080355312726032720.jpg" target="_blank">
                    <Avatar className="w-[100px] h-[95px]">
                        <AvatarImage src="https://i.postimg.cc/hGJMZPhV/6080355312726032720.jpg" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Link>
                <div>
                    <div>{name}&apos;s Profile</div>
                    <div className="mt-2 space-x-2">
                        <Badge variant="destructive">{gender}</Badge>
                        <Badge variant="outline">{age}</Badge>
                        <Badge variant="outline">{region}</Badge>
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
