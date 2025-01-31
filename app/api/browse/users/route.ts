import axios from 'axios';
import { NextResponse } from 'next/server';
export async function GET(req : Request) {
    try {
        const url = new URL(req.url);
        const currentPage = Number(url.searchParams.get("page")) || 1;
        const current_search_keyword = String(url.searchParams.get("search")) || "";
        // console.log("current page from api call", currentPage);
        // console.log("search from api call", current_search_keyword);
        const api_url = process.env.API_URL;
        const response = await axios.get(`${api_url}/browse/users?page=${currentPage}&search=${current_search_keyword}`);
        return NextResponse.json({ data : response.data.data, message : "users found" , status : 200, pagination : response.data.pagination || null });
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            status : 500, 
            message : "user not found"
        });
    }
}