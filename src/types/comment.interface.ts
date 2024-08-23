import { IItem } from './item.interface';

export interface IComment {
    id: number;
    textComment: string;
    creationDate: Date;
    userFullname: string;
    userId: number | undefined;
}

export type ICommentWithItem = Omit<IComment, 'item'> & { item: IItem };
