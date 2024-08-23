import { IReaction, IReactionWithItem } from '@/types/reaction.interface';
import { baseApi } from './baseApi';

export const reactionsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        setReaction: builder.mutation<string, { reaction: IReaction; itemId: number }>({
            query: ({ reaction, itemId }) => ({
                body: reaction,
                url: `/reaction/${itemId}`,
                method: 'POST'
            }),
            invalidatesTags: () => ['Item', 'Collection', 'Collections']
        }),
        getUserReactions: builder.query<IReactionWithItem[], number>({
            query: (limit) => ({
                url: `/reaction/user/${limit}`,
                method: 'GET'
            }),
            providesTags: ['Item', 'Collection']
        })
    })
});

export const { useSetReactionMutation, useGetUserReactionsQuery } = reactionsApi;
