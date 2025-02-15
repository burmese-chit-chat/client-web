import axios from "axios";
import { NextResponse } from "next/server";

type IParamsProps = {
    params : Promise<{ id : string }>
}

export async function DELETE(req : Request, { params } : IParamsProps) {
    try {
        console.log('delete api');
        const { id } = await params;
        const api_url = process.env.API_URL;
        const res = await axios.delete(`${api_url}/chat/conversations/conversation/${id}`);
        if(res.status === 200) return NextResponse.json({ data : null, message : 'conversation deleted', status : 200 });
        else throw new Error('error deleting message')
    } catch (e) {
        console.log('gone to error');
        console.log(e);
        return NextResponse.json({
            status : 500, 
            message : 'error deleting message'
        });
    }
}