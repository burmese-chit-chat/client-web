"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React from "react";

export default function CopyToClipboard({ text }: { text: string }) {
    const { toast } = useToast();
    return (
        <>
            <Button title="click to copy" onClick={copy_and_toast} className="mx-2" variant="outline">
                {text}
            </Button>
        </>
    );

    function copy_and_toast() {
        window.navigator.clipboard
            .writeText(text)
            .then(() => {
                console.log("Text copied to clipboard:", text);
                toast({
                    title : "text copied to clipboard" 
                });
            })
            .catch(err => {
                console.error("Failed to copy text:", err);
                toast({
                    title : "error copying to clipboard", 
                    variant : "destructive" 
                });
            });
    }
}
