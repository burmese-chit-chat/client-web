export default async function get_user (user_id : string, client? : boolean) {
    const url = client ? `/api/users/${user_id}` : `${process.env.BASE_URL}/api/users/${user_id}`
    const response = await fetch(url , { cache : 'no-store' });
    const response_json = await response.json();
    const user = response_json.data;
    return user;
}