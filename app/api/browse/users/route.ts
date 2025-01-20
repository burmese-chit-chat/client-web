import axios from 'axios';
import { NextResponse } from 'next/server';
export async function GET() {
    try {
        const api_url = process.env.API_URL;
        const response = await axios.get(`${api_url}/browse/users`);
        return NextResponse.json({ data : response.data.data, message : "users found" , status : 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            status : 500, 
            message : "user not found"
        });
    }
}