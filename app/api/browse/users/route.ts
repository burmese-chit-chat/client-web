import axios from 'axios';
import { NextResponse } from 'next/server';
export async function GET(req : Request) {
    try {
        const url = new URL(req.url);
        const currentPage = Number(url.searchParams.get("page")) || 1;
        const current_search_keyword = String(url.searchParams.get("search")) || "";
        const gender =url.searchParams.get("gender") ? String(url.searchParams.get("gender")) : null;
        const api_url = process.env.API_URL;
        const url_for_fetch = gender ? `${api_url}/browse/users?page=${currentPage}&search=${current_search_keyword}&gender=${gender}` : `${api_url}/browse/users?page=${currentPage}&search=${current_search_keyword}`;
        const response = await axios.get(url_for_fetch);
        return NextResponse.json({ data : response.data.data, message : "users found" , status : 200, pagination : response.data.pagination || null });
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            status : 500, 
            message : "user not found"
        });
    }
}