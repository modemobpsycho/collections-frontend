import { ICollection } from './collection.interface';

export interface IUser {
    id: number;
    fullName: string;
    email: string;
    password: string;
    role: number;
    access: boolean;
    accessToken: string;
    joinDate: Date;
    loginDate: Date;
    collections: ICollection[] | undefined;
}

export interface IUserRegisterInfo {
    fullName: string;
    email: string;
    password: string;
}

export interface IUserLoginInfo {
    email: string;
    password: string;
}

export interface IUserDeleteInfo {
    email: string;
    fullName: string;
    accessToken: string;
}

export interface IUserUpdateInfo {
    email: string;
    newPassword: string;
    oldPassword: string;
    fullName: string;
    accessToken?: string;
    access?: boolean;
    role?: number;
}
