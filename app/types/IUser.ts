import ICloudinaryFile from "@/app/types/ICloudinaryFile";

export default interface IUser {
    _id: string;
    username: string;
    password: string;
    name?: string;
    profile? : ICloudinaryFile;
    is_verified : boolean;
    createdAt?: Date;
    updatedAt?: Date;
}