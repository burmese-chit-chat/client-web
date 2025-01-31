import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IProps {
    title : string;
    body : string;
}
export default function LargeTexts({ title , body } : IProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{ title }</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-left opacity-80">{ body }</p>
            </CardContent>
        </Card>
    );
}
