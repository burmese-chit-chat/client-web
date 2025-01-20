import axios from "axios";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const { token } = Object.fromEntries(searchParams);
        const api_url = process.env.API_URL;
        const response = await axios.get(`${api_url}/auth/me?token=${token}`);
        console.log("response in me", response.data);
        return NextResponse.json({ user: response.data.data, status : 200 });
    } catch (e) {
        console.error("error", e);
        return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
    }
}
