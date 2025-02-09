"use server";

import { revalidatePath } from "next/cache";

export async function refreshConversations() {
    revalidatePath("/conversations"); // Adjust path to match your conversations page
}
