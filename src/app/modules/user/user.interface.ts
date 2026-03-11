import { Types } from "mongoose";

export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE"
}

export interface IAuthProvider{
    provider: string;
    provderId: string
}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IUser{
    name: string;
    email: string;
    password ?: string;
    phone ?: string;
    picture ?: string;
    address ?: string;
    isDelete ? : string;
    isActive ?: IsActive;
    isVerified ?: string;
    role: Role
    auts: IAuthProvider[];
    booking ?: Types.ObjectId[];
    guides ?: Types.ObjectId[]
    
}