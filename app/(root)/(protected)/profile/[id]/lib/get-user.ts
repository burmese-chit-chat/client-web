export default async function get_user (user_id : string) {
    const response = await fetch(`${process.env.BASE_URL}/api/users/${user_id}`, { cache : 'no-store' });
    const response_json = await response.json();
    const user = response_json.data;
    return user;
}