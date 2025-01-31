"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(0).max(50).optional(),
    age: z.number().min(18, { message: "You should be at least 18 years old." }).max(85).optional(),
    gender: z.string().min(0).max(10).optional(),
    region: z.string().min(0).max(50).optional(),
    status_message: z.string().min(0).max(550).optional(),
    about_me: z.string().min(0).max(3000).optional(),
    interests_1: z.string().min(0).max(50).optional(),
    interests_2: z.string().min(0).max(50).optional(),
    interests_3: z.string().min(0).max(50).optional(),
    interests_4: z.string().min(0).max(50).optional(),
    interests_5: z.string().min(0).max(50).optional(),
    profile: z.string().min(0).max(500).optional(),
});

export default function ProfileEditForm(props: IProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [profileLink, setProfileLink] = useState<string>(props.profile || "");
    // const [ loading , setLoading ] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: props.name || "",
            age: props.age || 18,
            gender: props.gender || "",
            region: props.region || "",
            status_message: props.status_message || "",
            about_me: props.about_me || "",
            interests_1: props.interests?.[0] || "",
            interests_2: props.interests?.[1] || "",
            interests_3: props.interests?.[2] || "",
            interests_4: props.interests?.[3] || "",
            interests_5: props.interests?.[4] || "",
            profile: props.profile || "",
        },
    });
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="profile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profile</FormLabel>
                                {profileLink && profileLink !== "" && (
                                    <Avatar className="w-[75px] h-[70px]">
                                        <AvatarImage src={profileLink} alt="profile pic" />
                                        <AvatarFallback>PF</AvatarFallback>
                                    </Avatar>
                                )}
                                <FormControl>
                                    <Input
                                        type="url"
                                        placeholder="Your profile picture"
                                        {...field}
                                        onChange={e => {
                                            field.onChange(e);
                                            setProfileLink(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    File uploading is not supported yet. You can upload your profiles in platforms such as{" "}
                                    <Link className={badgeVariants({ variant: "outline" })} href="https://postimages.org" target="_blank">
                                        https://postimages.org
                                    </Link>{" "}
                                    and paste the direct link of the image here here.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="your name" {...field} />
                                </FormControl>
                                <FormDescription>This is your public display name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                    <Input placeholder="18" {...field} type="number"
                                    onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormDescription>What is your age?</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="male" aria-selected>
                                            male
                                        </SelectItem>
                                        <SelectItem value="female">female</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>What is your gender?</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="region"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Region</FormLabel>
                                <FormControl>
                                    <Input placeholder="your region" {...field} />
                                </FormControl>
                                <FormDescription>Where u from?</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Card>
                        <CardHeader>
                            <CardTitle>Interests</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-2">
                            <FormField
                                control={form.control}
                                name="interests_1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea rows={2} placeholder="One of your interests" className="resize-none" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="interests_2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea rows={2} placeholder="One of your interests" className="resize-none" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="interests_3"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea rows={2} placeholder="One of your interests" className="resize-none" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="interests_4"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea rows={2} placeholder="One of your interests" className="resize-none" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="interests_5"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea rows={2} placeholder="One of your interests" className="resize-none" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <FormField
                        control={form.control}
                        name="status_message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status Message</FormLabel>
                                <FormControl>
                                    <Textarea rows={10} placeholder="What you feeling right now?" className="resize-none" {...field} />
                                </FormControl>
                                <FormDescription>You can tell us ur feelings.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="about_me"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>About Me</FormLabel>
                                <FormControl>
                                    <Textarea rows={20} placeholder="Tell us a bit about yourself" className="resize-none" {...field} />
                                </FormControl>
                                <FormDescription>What kind of a person you are?</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="px-8" variant="secondary" type="submit">
                        Save
                    </Button>
                </form>
            </Form>
        </div>
    );

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.put(`/api/users/${props._id}`, values);
            if (response.data.status === 200) {
                toast({
                    title: "User Successfully Updated",
                });
                router.refresh();
                router.push(`/profile/${props._id}`);
            } else {
                toast({
                    title: "ERROR UPDATING USER!!",
                    variant : "destructive"
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
}

interface IProps {
    _id: string;
    name?: string;
    age?: number;
    gender?: string;
    region?: string;
    status_message?: string;
    about_me?: string;
    interests?: Array<string>;
    profile?: string;
}
