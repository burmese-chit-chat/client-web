import IMessage from "@/app/types/IMessage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
interface MessageBubbleProps {
    message: IMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    // Check sender to determine layout
    const isSentByMe = message.sender_id === "me";

    return (
        <div className={`grid grid-cols-12 gap-3 items-end ${isSentByMe ? "justify-end" : "justify-start"}`}>
            {/* If the message is received, show avatar on the left */}
            {!isSentByMe && (
                <Avatar className="col-span-2">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            )}
            <Card className={`${isSentByMe ? "col-span-8 col-start-5 bg-blue-950 text-white" : "col-span-8 bg-slate-500 text-white"} rounded-md`}>
                <CardContent className="p-3 text-left whitespace-pre-wrap">{message.message}</CardContent>
            </Card>
        </div>
    );
}