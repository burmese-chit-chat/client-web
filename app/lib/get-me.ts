import { cookies } from "next/headers";
import IUser from "../types/IUser";
export default async function get_me() : Promise<IUser | null> {
    try {
        const cookie_store = await cookies();
        const token = cookie_store.get("token")?.value;
        if(!token) return null;
        console.log("cookie_store token from get_me", token);
        const response = await fetch("http://localhost:3000/api/auth/me?token=" + token,
            {
                credentials: "include",
                next: { revalidate : 3600 }
            }
        );
        const data = await response.json();
        if(data.status == 200) return data.user;
        else return null;
    } catch (e) {
        console.error("error", e);
        return null;
    }
}