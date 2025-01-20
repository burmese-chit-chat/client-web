
export default async function get_user_data (user_id : string) {
    const response = await fetch(`${process.env.BASE_URL}/api/users/${user_id}/user-data`);
    const response_json = await response.json();
    const user = response_json.data;
    return user;
}