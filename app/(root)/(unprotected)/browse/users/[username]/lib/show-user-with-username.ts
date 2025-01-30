import IUser from "@/app/types/IUser";
import IUserData from "@/app/types/IUserData";

async function show_user_with_username(username : string) : Promise<IUser | null> {
    try {
        const base_url = process.env.BASE_URL;
        const response = await fetch(`${base_url}/api/browse/users/${username}`, { next : { revalidate : 60}});
        const json_response = await response.json();
        console.log(json_response);
        return json_response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function show_user_data_with_user_id(user_id : IUser['_id'], base_url : string) : Promise<IUserData | null> {
    try {
        const response = await fetch(`${base_url}/api/browse/userdata/${user_id}`, { next : { revalidate : 60 }});
        const json_response = await response.json();
        console.log('user data', json_response);
        return json_response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export default show_user_with_username;