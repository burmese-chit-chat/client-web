import axios from 'axios';
import { NextResponse } from 'next/server';
type IParamsProps = {
    params : Promise<{ username : string }>
}
export async function GET(request : Request, { params } : IParamsProps) {
    try {
        const api_url = process.env.API_URL;
        const username = (await params).username;
        const response = await axios.get(`${api_url}/browse/users/${username}`);
        return NextResponse.json({ data : response.data.data, message : "user found" , status : 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            status : 500, 
            message : "user not found"
        });
    }
}