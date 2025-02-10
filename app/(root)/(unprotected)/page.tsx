import { AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

export default async function Home() {
    // const image_1 = "https://i.postimg.cc/85M4DKR5/6080355312726032716.jpg";
    const image_2 = "https://i.postimg.cc/VLwnCfcK/6084494651882064070.jpg";
    return (
        <>
            <div className="font-bold uppercase">Home Page</div>
            <Separator className="my-3"></Separator>
            <Card className="">
                <CardHeader>
                    <CardTitle className="text-center">
                        I do not know what to put in the home page yet so, here is a gift for my dear testers.
                        <br/>
                        Lovely Khine !!
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center gap-3 h-[500px]">
                    <Link href={image_2} target="_blank">
                        <Avatar className="h-full">
                            <AvatarImage className="w-full h-full" src={image_2} alt="my pic"></AvatarImage>
                            <AvatarFallback className="min-w-[200px]">loading...</AvatarFallback>
                        </Avatar>
                    </Link>
                </CardContent>

            </Card>
        </>
    );
}
