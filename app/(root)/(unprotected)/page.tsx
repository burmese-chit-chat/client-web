import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CopyToClipboard from "../components/copy-to-clipboard";

export default async function Home() {
    const gmail = "khine.dev.9417@gmail.com";
    return (
        <>
            <div className="font-bold uppercase">Home</div>
            <Separator className="my-3"></Separator>
            <Card className="mb-24">
                <CardHeader>
                    <CardTitle>ANNOUNCEMENT!!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p>- This is the early stage of the platform and there can be many bugs.</p>
                    <Separator />
                    <p>
                        - You can report the bugs and some inconveniences to <CopyToClipboard text={gmail} />.
                    </p>
                    <Separator />
                    <p className="">
                        - <span className="font-bold text-lg">Mobile application will be coming soon !!</span>
                    </p>
                </CardContent>
            </Card>
            <Card>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7511160783457466" crossOrigin="anonymous"></script>
                <ins className="adsbygoogle" style={ { display : 'block'} } data-ad-client="ca-pub-7511160783457466" data-ad-slot="1866067277" data-ad-format="auto" data-full-width-responsive="true"></ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            </Card>
        </>
    );
}
