import ProfileEditForm from "@/app/(root)/(protected)/profile/[_id]/edit/components/form";
import { Separator } from "@/components/ui/separator";

export default async function ProfileEdit({ params }: { params: { _id: string } }) {
    const { _id } = await params;
    console.log('user_id', _id);
    return (
        <>
            <h1 className="font-bold text-2xl">Edit Your Profile</h1>
            <Separator className="my-4"></Separator>
            <div>
                <ProfileEditForm name="assasd"></ProfileEditForm>
            </div>
        </>
    );
}

