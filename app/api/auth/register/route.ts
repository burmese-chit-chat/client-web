import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
    try {
        const api_url = process.env.API_URL;
        const body = await request.json();
        console.log("register body", body);
        console.log("api_url", api_url);
        const response = await axios.post(`${api_url}/auth/register`, body);
        console.log("response", response);
        
        return NextResponse.redirect(new URL('/', request.url));
    } catch (e) {
        console.error("error", e);
        return NextResponse.json(
            { error: "Registration failed" },
            { status: 500 }
        );
    }

}
