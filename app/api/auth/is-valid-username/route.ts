import axios from "axios";
import { NextResponse } from "next/server";
export async function GET(request : Request) {
    try {
        const api_url = process.env.API_URL;
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username");
        const response = await axios.get(`${api_url}/auth/is-valid-username?username=${username}`);
        console.log('response from checking username', response);
        if(response.status === 200) {
            return NextResponse.json({ status : 200 });
        }
    } catch (e) {
        console.error("error", e);
        return NextResponse.json({ status : 500 });
    }
}