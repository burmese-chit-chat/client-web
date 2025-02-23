"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { Share } from "lucide-react";

export default function CopyToClipboard({ text, label, show_icon = false, show_text = true, toast_text }: { text: string; label?: string, show_icon? : boolean, show_text? : boolean, toast_text? : string }) {
    const { toast } = useToast();
    return (
        <>
            <Button title="click to copy" onClick={copy_and_toast} className="" variant="outline">
                { show_icon && <Share></Share> }
                { show_text && get_text_label() }
            </Button>
        </>
    );

    function get_text_label () : string {
        return label || text ;
    }

    function copy_and_toast() {
        if (window?.navigator?.clipboard) {
            window.navigator.clipboard
                .writeText(text)
                .then(() => {
                    console.log("Text copied to clipboard:", text);
                    toast({
                        title: toast_text || "text copied to clipboard",
                    });
                })
                .catch(err => {
                    console.error("Failed to copy text:", err);
                    toast({
                        title: "error copying to clipboard",
                        variant: "destructive",
                    });
                });
        } else {
            toast({
                title: "error copying to clipboard",
                variant: "destructive",
            });
        }
    }
}
