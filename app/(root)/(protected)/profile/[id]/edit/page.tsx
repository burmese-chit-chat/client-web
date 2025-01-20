export const dynamic = 'force-dynamic'; // Force dynamic rendering
import ProfileEditForm from "@/app/(root)/(protected)/profile/[id]/edit/components/form";
import { Separator } from "@/components/ui/separator";
import get_user from "../lib/get-user";
import get_user_data from "../lib/get-user-data";

export default async function ProfileEdit({ params }: { params : Promise<{ id : string}>}) {
    const { id } = await params;
    const user = await get_user(id);
    const user_data = await get_user_data(id);
    return (
        <>
            <h1 className="font-bold text-2xl">Edit Your Profile</h1>
            <Separator className="my-4"></Separator>
            <div className="mb-10">
                <ProfileEditForm _id={id} name={ user?.name || '' } age={user?.age || 18 } gender={ user?.gender || '' } region={user?.region || ''} status_message={user_data?.status_message || ''} about_me={user_data?.about_me || ''} interests={interests()} profile={user?.profile?.secure_url || ''}></ProfileEditForm>
            </div>
        </>
    );
    function interests(): Array<string> {
        return [
            user_data?.interests_1 || '',
            user_data?.interests_2 || '',
            user_data?.interests_3 || '',
            user_data?.interests_4 || '',
            user_data?.interests_5 || '',
        ];
    }
}



