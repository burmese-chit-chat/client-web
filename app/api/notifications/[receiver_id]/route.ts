import axios from "axios";
import { NextResponse } from "next/server";
type IParamsProps = {
    params : Promise<{ receiver_id : string }>
}
export async function GET(req : Request, { params } : IParamsProps) {
    try {
        const url = new URL(req.url);
        const currentPage = Number(url.searchParams.get("page")) || 1;
        const { receiver_id } = await params;
        const api_url = process.env.API_URL;
        const response = await axios.get(`${api_url}/notifications/notifications/${receiver_id}?page=${currentPage}`);
        return NextResponse.json({ data : response.data.data, message : "notifications found" , status : 200, pagination : response.data.pagination || null });
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            status : 500, 
            message : "notifications not found"
        });
    }
}