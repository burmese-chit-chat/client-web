"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AskingCard() {
    const router = useRouter();
    const [ already_asked_for_notification_permission, set_already_asked_for_notification_permission ] = React.useState<string | null>(null);
    React.useEffect(() => {
        console.log('checking infinite loop from asking card');
        const from_localstorage = window.localStorage.getItem("already_asked_for_notification_permission");
        set_already_asked_for_notification_permission(from_localstorage);
    }, [])
    if(!already_asked_for_notification_permission) return (
        <Card>
            <CardHeader>
                <div>Would you like to allow notifications?</div>
            </CardHeader>
            <CardContent className="space-x-5">
                <Button onClick={handle_no} variant="destructive" className="px-6">
                    No
                </Button>
                <Button variant="outline" onClick={handle_yes} className="px-6">
                    Yes
                </Button>
            </CardContent>
            <CardDescription className="p-3">
                <div>If you clicked NO, you can still see the notifications here, but there will not be any in your device&apos;s notification section.</div>
            </CardDescription>
        </Card>
    );
    return (
        <></>
    );

    function handle_no() {
        window.localStorage.setItem("already_asked_for_notification_permission", "yes");
        const from_localstorage = window.localStorage.getItem("already_asked_for_notification_permission");
        set_already_asked_for_notification_permission(from_localstorage);
        router.push("/");
    }
    function handle_yes() {
        request_notification_permission();
        window.localStorage.setItem("already_asked_for_notification_permission", "yes");
        const from_localstorage = window.localStorage.getItem("already_asked_for_notification_permission");
        set_already_asked_for_notification_permission(from_localstorage);
    }
}

function request_notification_permission(): void {
    console.log("notification permission from console.", Notification.permission);
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
