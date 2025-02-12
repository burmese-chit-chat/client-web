"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AskingCard() {
    return (
        <Card>
            <CardHeader>
                <div>Would you like to allow notifications?</div>
            </CardHeader>
            <CardContent className="space-x-5">
                <Button variant="destructive" className="px-6">No</Button>
                <Button variant="outline" onClick={requestNotificationPermission} className="px-6">Yes</Button>
            </CardContent>
            <CardDescription className="p-3">
                <div>If you clicked NO, you can still see the notifications here, but there will not be any in your device&apos;s notification section.</div>
            </CardDescription>
        </Card>
    );
}

function requestNotificationPermission(): void {
    console.log('notification permission from console.', Notification.permission);
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
            } else {
                console.log("Notification permission denied.");
            }
        });
    }
}
