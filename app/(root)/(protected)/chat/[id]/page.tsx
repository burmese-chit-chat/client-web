import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export default function page() {
    return (
        <>
            <div className="grid grid-cols-12 gap-2">
                <Avatar className=" col-span-2">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="col-span-10 font-bold text-2xl">Khine</div>
            </div>
            <Separator className="my-3" />

            <div>
                <div className="grid grid-cols-12 gap-3">
                    <Avatar className=" col-span-2">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Card className="col-span-8 bg-slate-500 rounded-md">
                      <CardContent className="p-3 text-left">
                        { message() }
                      </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-12 gap-3">
                    <Card className="col-span-8 bg-blue-950 rounded-md col-start-2">
                      <CardContent className="p-3 text-left">
                        { message() }
                      </CardContent>
                    </Card>
                    <Avatar className=" col-span-2 col-start-11">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div></div>
        </>
    );
}


function message () : string {
  return `
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis molestiae labore quia vel omnis consequuntur velit explicabo vero quo, ducimus libero neque provident accusamus ipsam. Quis, explicabo! Sapiente, ratione quia.
  `;
}