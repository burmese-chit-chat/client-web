
"use server";
import { revalidatePath } from "next/cache";
export async function refreshMessages(user_id : string) {
    revalidatePath(`/chat/${user_id}`); 
}