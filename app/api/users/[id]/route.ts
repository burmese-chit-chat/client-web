import axios from "axios";
import { NextResponse } from "next/server";

export async function PUT(req : Request, { params } : { params : Promise<{id : string}>}) {
    try {
        const api_url = process.env.API_URL;
        const user_id = (await params).id;
        const body = await req.json();
        const response = await axios.put(`${api_url}/users/${user_id}`, body);
        return NextResponse.json({ data : response.data.data, message : "successfully updated" , status : 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            status : 500, 
            message : "error updating user"
        })
    }
}

export async function GET(req : Request, { params } : { params : Promise<{id : string}>}) {
    try {
        const api_url = process.env.API_URL;
        const user_id = (await params).id;
        const response = await axios.get(`${api_url}/users/${user_id}`);
        return NextResponse.json({ data : response.data.data, message : "user found" , status : 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            status : 500, 
            message : "user not found"
        });
    }
}