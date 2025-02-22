import IUser from "@/app/types/IUser";
import { EnumGender } from "@/app/types/TGenders";

export async function browse_all_users (page : number, search : string, gender : EnumGender | null) : Promise<{users : IUser[], pagination : { total : number, page : number}}> {
    try {
        const base_url = process.env.BASE_URL;
        const url = gender ? `${base_url}/api/browse/users?page=${page}&search=${search}&gender=${gender}` : `${base_url}/api/browse/users?page=${page}&search=${search}`;
        const response = await fetch(url);
        const json_response = await response.json();
        const users = json_response.data;
        const pagination = json_response.pagination;
        if(json_response.status !== 200) throw new Error('users not found');
        return { users, pagination };
    } catch (e) {
        console.log(e);
        return { users : [], pagination : { total : 0, page : 1 }};
    }
}