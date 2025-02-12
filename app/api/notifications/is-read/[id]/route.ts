
import axios from "axios";
import { NextResponse } from "next/server";
type IParamsProps = {
    params : Promise<{ id : string }>
}
export async function GET(req : Request, { params } : IParamsProps) {
    try {
        const { id } = await params;
        const api_url = process.env.API_URL;
        const response = await axios.put(`${api_url}/notifications/notifications/is-read/${id}`);
        return NextResponse.json({ data : response.data.data, message : "notification updated" , status : 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            status : 500, 
            message : "error updating notification"
        });
    }
}