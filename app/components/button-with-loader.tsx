"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation'

interface IProps {
    children?: React.ReactNode; // should include
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    handler?: () => Promise<void> | void;
    navigation_link? : string
}
export default function ButtonWithLoader({ children, className, variant, handler, navigation_link }: IProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, set_loading] = React.useState<boolean>(false);
    const handleClick = async () => {
        try {
            set_loading(true);
            if (handler) {
                await handler();
            }
            if(navigation_link) {
                router.push(navigation_link);
            }
        } catch (error) {
            console.error("Error in handler:", error);
            toast({
                variant: "destructive",
                title: "An unknown error occurred",
            });
        } finally {
            set_loading(false);
        }
    };
    return (
        <Button onClick={handleClick} className={className || ""} variant={variant || null}>
            {loading ? <LoaderCircle className="animate-spin" /> : <>{children || ""}</>}
        </Button>
    );
}
