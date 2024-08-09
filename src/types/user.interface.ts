import { ICollection } from './collection.interface';

export interface IUser {
    username: string;
    position: string;
    email: string;
    collections: ICollection[];
}
