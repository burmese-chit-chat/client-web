"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface IProps {
    href: string;
    children?: React.ReactNode;
    className? : string;
    variant? : "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}

export default function LinkButton({ href, children, className, variant }: IProps) {
    const [loading, set_loading] = React.useState<boolean>(false);
    return (
        <Button asChild className={className || ""} variant={variant || null} onClick={() => set_loading(true)}>
            <Link href={href}>
            {loading ? <LoaderCircle className="animate-spin" /> : <>{children || ""}</>}
            </Link>
        </Button>
    );
}
