import IUser from "@/app/types/IUser";

interface IUserData {
    _id? : string;
    user_id : IUser['_id'];
    interests_1? : string;
    interests_2? : string;
    interests_3? : string;
    interests_4? : string;
    interests_5? : string;
    status_message? : string;
    about_me? : string;
    createdAt? : Date;
    updatedAt? : Date;
}
export default IUserData;