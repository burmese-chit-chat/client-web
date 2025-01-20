import IUser from "@/app/types/IUser";
export async function browse_all_users () : Promise<Array<IUser>> {
    try {
        const base_url = process.env.BASE_URL;
        const response = await fetch(`${base_url}/api/browse/users`);
        const json_response = await response.json();
        const users = json_response.data;
        if(json_response.status !== 200) throw new Error('users not found');
        console.log('users' , users);
        return users;
    } catch (e) {
        console.log(e);
        return [];
    }
}