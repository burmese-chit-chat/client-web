"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnumGender } from "@/app/types/TGenders";

export default function SearchForm({ page, keyword, gender }: { page: number; keyword?: string, gender : EnumGender | null }) {
    const router = useRouter();
    console.log(page,gender, keyword);
    const [search_keyword, set_search_keyword] = React.useState<string>(keyword || "");
    useEffect(() => {
        set_search_keyword(keyword || "");
    }, [keyword])
    return (
        <div>
            <div className="mb-5 flex gap-2">
                <Button onClick={() => { gender_filter(null); }} variant={"outline"} className={!gender ? 'bg-white text-black focus:bg-white focus:text-black' : ''}>All</Button>
                <Button onClick={() => { gender_filter(EnumGender.male); }} variant={"outline"} className={gender === EnumGender.male ? 'bg-white text-black focus:bg-white focus:text-black' : ''}>Male</Button>
                <Button onClick={() => { gender_filter(EnumGender.female); }} variant={"outline"} className={gender === EnumGender.female ? 'bg-white text-black focus:bg-white focus:text-black' : ''}>Female</Button>
            </div>
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
                <Button type="button" variant={'outline'} className="text-xs" onClick={clear_filters}>
                    clear filters
                </Button>
            </form>
        </div>
    );

    function clear_filters() {
        set_search_keyword("");
        router.push(`/browse?page=${1}`);
    }
    function gender_filter (gender : EnumGender | null) {
        router.push(gender ? `/browse?page=${1}&search=${search_keyword}&gender=${gender}` : `/browse?page=${1}&search=${search_keyword}`);
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        router.push(gender ? `/browse?page=${1}&search=${search_keyword}&gender=${gender}` : `/browse?page=${1}&search=${search_keyword}`);
    }
}
