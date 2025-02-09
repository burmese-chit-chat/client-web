import axios from 'axios';
import { NextResponse } from 'next/server';
type IParamsProps = {
    params : Promise<{ user1_id : string, user2_id : string }>
}
export async function GET(req : Request, { params } : IParamsProps) {
    try {
        const api_url = process.env.API_URL;
        const url = new URL(req.url);
        const before = url.searchParams.get("before");
        const { user1_id, user2_id } = await params;
        const api_url_with_or_not_before = before ? `${api_url}/chat/messages/${user1_id}/${user2_id}?before=${before}` : `${api_url}/chat/messages/${user1_id}/${user2_id}`
        const response = await axios.get(api_url_with_or_not_before);
        return NextResponse.json({ data : response.data.data, message : "messages found" , status : 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            status : 500, 
            message : "messages not found"
        });
    }
}