"use server";
import { revalidatePath } from "next/cache";
export async function refreshBrowseUsers() {
    revalidatePath("/browse"); 
}
