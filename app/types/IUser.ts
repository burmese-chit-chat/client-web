import ICloudinaryFile from "@/app/types/ICloudinaryFile";
import TGenders from "./TGenders";

export default interface IUser {
    _id: string;
    username: string;
    password: string;
    name?: string;
    profile? : ICloudinaryFile;
    is_verified : boolean;
    gender? : TGenders;
    age? : number;
    region? : string;
    createdAt?: Date;
    updatedAt?: Date;
}