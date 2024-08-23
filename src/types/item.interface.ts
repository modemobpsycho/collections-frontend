import { ICollection, ICollectionCreateWithUser } from './collection.interface';
import { IComment } from './comment.interface';
import { IItemFields } from './itemFields.interface';
import { IReaction } from './reaction.interface';
import { ITag } from './tag.interface';

export interface IItem {
    id: number;
    name: string;
    tags: ITag[] | undefined;
    creationDate: Date;
    ItemFields: IItemFields[] | undefined;
    comments: IComment[] | undefined;
    likes: IReaction[] | undefined;
    collection?: ICollection;
}

export type IItemWithFields = Omit<IItem, 'ItemFields'> & { ItemFields: IItemFields[] };

export type IItemInfo = Omit<IItem, 'collection'> & { collection: ICollectionCreateWithUser };
