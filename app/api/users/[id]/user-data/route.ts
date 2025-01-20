import { NextResponse } from "next/server";
import axios from "axios";
export async function GET(req : Request, { params } : { params : Promise<{id : string}>}) {
    try {
        const api_url = process.env.API_URL;
        const user_id = (await params).id;
        const response = await axios.get(`${api_url}/users/${user_id}/user-data`);
        return NextResponse.json({ data : response.data.data, message : "user data found" , status : 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            status : 500, 
            message : "user data not found"
        });
    }
}