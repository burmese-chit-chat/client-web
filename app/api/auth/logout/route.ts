import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
export async function GET() {
    const cookie_store = await cookies();
    try {
        const api_url = process.env.API_URL;
        const response = await axios.get(`${api_url}/auth/logout`)
        console.log(response);
        if(response.status === 200) {
            cookie_store.delete("token");
            return NextResponse.json({
                status : 200, 
                message : "successfully logged out"
            })
        }
    } catch (e) {
        console.log(e);
            return NextResponse.json({
                status : 500, 
                message : "error logging out"
            })
    }

}