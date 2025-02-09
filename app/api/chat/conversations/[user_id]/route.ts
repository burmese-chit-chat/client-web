
import axios from 'axios';
import { NextResponse } from 'next/server';
type IParamsProps = {
    params : Promise<{ user_id : string }>
}
export async function GET(req : Request, { params } : IParamsProps) {
    try {
        const api_url = process.env.API_URL;
        const url = new URL(req.url);
        const page = Number(url.searchParams.get("page")) || 1;
        const { user_id } = await params;
        const api_url_with_page = `${api_url}/chat/conversations/${user_id}?page=${page}`;
        const response = await axios.get(api_url_with_page);
        return NextResponse.json({ data : response.data.data, message : "conversations found" , status : 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            status : 500, 
            message : "conversations not found"
        });
    }
}