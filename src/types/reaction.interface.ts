import { IItem } from './item.interface';

export interface IReaction {
    id: number;
    isLike: boolean;
    creationDate: Date;
    userId: number;
}

export type IReactionWithItem = Omit<IReaction, 'item'> & { item: IItem };
