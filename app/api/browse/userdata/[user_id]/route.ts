
import axios from 'axios';
import { NextResponse } from 'next/server';
type IParamsProps = {
    params : Promise<{ user_id : string }>
}
export async function GET(request : Request, { params } : IParamsProps) {
    try {
        const api_url = process.env.API_URL;
        const user_id = (await params).user_id;
        const response = await axios.get(`${api_url}/browse/userdata/${user_id}`);
        return NextResponse.json({ data : response.data.data, message : "user data found" , status : 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            status : 500, 
            message : "user data not found"
        });
    }
}