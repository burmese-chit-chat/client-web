"use server";
import { revalidatePath } from "next/cache";
export async function refreshConversations() {
    revalidatePath("/conversations"); 
}
