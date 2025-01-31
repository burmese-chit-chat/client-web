import IUser from "@/app/types/IUser";

export async function browse_all_users (page : number, search : string) : Promise<{users : IUser[], pagination : { total : number, page : number}}> {
    try {
        const base_url = process.env.BASE_URL;
        // console.log("from browse_all_users", page, search);
        const response = await fetch(`${base_url}/api/browse/users?page=${page}&search=${search}`, { next : { revalidate : 0 }});
        const json_response = await response.json();
        console.log("from browse all users", json_response);
        const users = json_response.data;
        const pagination = json_response.pagination;
        if(json_response.status !== 200) throw new Error('users not found');
        return { users, pagination };
    } catch (e) {
        console.log(e);
        return { users : [], pagination : { total : 0, page : 1 }};
    }
}