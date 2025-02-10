import IMessage from "@/app/types/IMessage";
import IUser from "@/app/types/IUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
interface IMessageBubbleProps {
    message: IMessage;
    me: IUser;
    user: IUser;
}

export default function MessageBubble({ message, me, user }: IMessageBubbleProps) {
    // Check sender to determine layout
    const isSentByMe = message.sender_id === me._id;

    if (isSentByMe)
        return (
            <div className="w-full flex justify-end">
                <Card className="bg-gray-500 w-3/4 lg:w-2/4">
                    <CardContent className="p-3 text-left whitespace-pre-wrap">{message.message}</CardContent>
                </Card>
            </div>
        );
    else
        return (
            <div className="w-full">
                <div className="flex justify-start gap-5 items-center w-3/4 lg:w-2/4">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={user.profile?.secure_url || ""} alt="user profile" />
                        <AvatarFallback>{(user.name || user.username)[0]}</AvatarFallback>
                    </Avatar>
                    <Card className="flex-1">
                        <CardContent className="p-3 text-left whitespace-pre-wrap">{message.message}</CardContent>
                    </Card>
                </div>
            </div>
        );
}
