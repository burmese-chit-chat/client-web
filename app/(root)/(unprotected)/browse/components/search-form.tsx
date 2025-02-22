"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchForm({ page , keyword }: { page: number, keyword? : string }) {
    const router = useRouter();
    console.log(page);
    const [ search_keyword, set_search_keyword ] = React.useState<string>(keyword || "");
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex items-start gap-3">
                <Input
                    type="text"
                    value={search_keyword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        set_search_keyword(e.currentTarget.value);
                    }}
                ></Input>
                <Button type="submit" variant="outline">
                    <Search size={24} />
                </Button>
            </form>
        </div>
    );
    function handleSubmit (e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        router.push(`/browse?page=${1}&search=${search_keyword}`);
    }
}
