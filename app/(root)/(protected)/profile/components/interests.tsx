import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface IProps {
    interests : Array<string>;
}
export default function Interests({ interests } : IProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-3">
                    {interests.map((item: string, i) => (
                        (item !== '' && item !== undefined && item !== null) && (
                        <Badge key={i} variant="outline" className="px-2 py-2">
                            {item}
                        </Badge>
                        )
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
