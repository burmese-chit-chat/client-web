"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z
    .object({
        username: z
            .string()
            .min(2, {
                message: "Username must be at least 2 characters.",
            })
            .max(50, {
                message: "Username must be at most 50 characters.",
            })
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
            .refine(value => !value.includes("."), `Username cannot contain periods, "."`)
            .refine(value => !value.includes(" ") && !value.includes("\n"), "Username cannot contain spaces or line breaks"),

        password: z
            .string()
            .min(8, {
                message: "Password must be at least 8 characters.",
            })
            .max(50, {
                message: "Password must be at most 50 characters.",
            }),

        confirm_password: z.string().min(8, { message: "" }).max(50, { message: "" }),
    })
    .superRefine(({ confirm_password, password }, ctx) => {
        if (confirm_password !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
                path: ["confirm_password"],
            });
        }
    });

export default function RegisterForm() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [usernameLoading, setUsernameLoading] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            confirm_password: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="your username" {...field} onChange={(e) => {
                                    field.onChange(e);
                                    checkUsername(e.target.value);
                                }}/>
                            </FormControl>
                            <FormDescription>
                                This is your unique identifier(id) in Burmese Chit Chat. Others users can find you easily using this id or share your profile.
                                { usernameLoading && <span>Loading....</span> }
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" {...field} type="password" />
                            </FormControl>
                            <FormDescription>You know what this is. Keep it secret, keep it safe and don&apos;t forget.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="confirm password" {...field} type="password" />
                            </FormControl>
                            <FormDescription>Please re-enter your password to confirm.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant="secondary" type="submit">
                    Submit
                </Button>
            </form>
            {loading && <div>Loading...</div>}
        </Form>
    );

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if(usernameLoading) return;
        if(!await checkUsername(values.username)) return;
        console.log("values", values);
        setLoading(true);
        try {
            const response = await axios.post("/api/auth/register", values);
            console.log("here", response);
            console.log("status", response.status);
            if (response.status === 200 && response.data.redirect) {
                console.log("OK");
                form.reset();
                router.push(response.data.url);
            }
        } catch (e) {
            console.error("error", e);
        } finally {
            setLoading(false);
        }
    }

    async function checkUsername(username: string) : Promise<boolean> {
        if (username.length < 2) return true;
        setUsernameLoading(true);
        try {
            const response = await axios.get(`/api/auth/is-valid-username?username=${username}`);
            console.log("response from checking username", response);
            if (response.data.status === 200) {
                form.clearErrors("username");
                return true;
            } else {
                form.setError("username", {
                    type: "manual",
                    message: "Username is already taken",
                });
                return false;
            }
        } catch (e) {
            console.error("error", e);
            return false;
        } finally {
            setUsernameLoading(false);
        }
    }
}
