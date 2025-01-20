import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const cookie_store = await cookies();
        const api_url = process.env.API_URL;
        const body = await request.json();
        console.log('the body', body);

        const response = await axios.post(`${api_url}/auth/login`, body);

        cookie_store.set({
            name: "token",
            value: response.data.token,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return NextResponse.json(
            {
                url: "/",
                redirect: true,
            },
            {
                headers: {
                    "Set-Cookie": `token=${response.data.token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
                },
            }
        );
    } catch (e) {
        console.error("error", e);
        return NextResponse.json({ error: "Registration failed" }, { status: 500 });
    }
}
