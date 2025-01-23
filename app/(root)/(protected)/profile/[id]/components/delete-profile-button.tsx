"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import axios from "axios";
interface IProps {
    user_id: string;
    base_url: string;
}
export default function DeleteProfileButton({ user_id, base_url }: IProps) {
    return (
        <Button onClick={delete_profile} type="button" variant="destructive">
            <Trash2 />
            Delete Profile
        </Button>
    );
    async function delete_profile() {
        if(!base_url) {
            alert("base_url is not defined | error deleting profile");
            return;
        }
        const result = window.confirm("Are you sure you want to delete your profile?");
        if(!result) return;
        const response = await axios.delete(`${base_url}/api/users/${user_id}`);
        console.log(response.data.data);
        if (response.data.status === 200) {
            window.location.href = "/auth/login";
        } else {
            console.log("error deleting profile");
            alert("error deleting profile")
        }
    }
}
