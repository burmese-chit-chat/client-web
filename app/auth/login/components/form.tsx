"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
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
});

export default function LoginForm() {
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const [ show_password, set_show_password ] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
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
                                <Input placeholder="your username" {...field} />
                            </FormControl>
                            <FormDescription>Please enter your user name.</FormDescription>
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
                                <Input placeholder="password" {...field} type={show_password ? 'text' : 'password'} />
                            </FormControl>
                            <FormDescription>Please enter your password</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center space-x-2 -translate-y-4">
                    <div onClick={ () => set_show_password(prev => !prev) } className={`w-4 cursor-pointer rounded-sm p-1 aspect-square border border-gray-300`}>
                        { show_password && <div className="w-full h-full rounded-sm bg-white"></div> }
                    </div>
                    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        show password
                    </span>
                </div>

                <Button variant="secondary" type="submit">
                    Submit
                </Button>
            </form>
            {loading && <div>Loading...</div>}
        </Form>
    );

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const error_message: string = "Login error, this may be because of invalid credentials or server error. If you are sure your credentials are correct, please contact the developer.";
        setLoading(true);
        try {
            const response = await axios.post("/api/auth/login", values);
            if (response.status === 200 && response.data.redirect) {
                form.reset();
                window.location.href = response.data.url || "/";
            } else {
                toast({
                    title: "Login Failed",
                    description: error_message,
                    variant: "destructive",
                });
            }
        } catch (e) {
            console.error("error", e);
            toast({
                title: "Login Failed",
                description: error_message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }
}
