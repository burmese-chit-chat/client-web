

import axios from 'axios';
import { NextResponse } from 'next/server';
type IParamsProps = {
    params : Promise<{ user_id : string }>
}
export async function GET(req : Request, { params } : IParamsProps) {
    try {
        const api_url = process.env.API_URL;
        const { user_id } = await params;
        const response = await axios.get(`${api_url}/chat/conversations/${user_id}/count-unread`);
        return NextResponse.json({ data : response.data.data, message : "conversations found" , status : 200, pagination : response.data.pagination || null });
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            status : 500, 
            message : "conversations not found"
        });
    }
}