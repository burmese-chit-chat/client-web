import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    const image_1 = "https://i.postimg.cc/VLwnCfcK/6084494651882064070.jpg";
    return (
        <>
            <div className="font-bold uppercase">Home Page</div>
            <Separator className="my-3"></Separator>
            <div>I do not know what to put in the home page yet so, here is a gift for my dear testers.</div>
            <div className="mt-5 flex justify-center">
                <Link href={image_1} className="" target="_blank">
                    <Image width={200} height={489} className="rounded-lg" src={image_1} alt="image"></Image>
                </Link>
            </div>
        </>
    );
}
