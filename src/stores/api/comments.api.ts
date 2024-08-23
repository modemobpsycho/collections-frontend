import { IComment, ICommentWithItem } from '@/types/comment.interface';
import { baseApi } from './baseApi';

export const commentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addComment: builder.mutation<string, { comment: IComment; itemId: number }>({
            query: ({ comment, itemId }) => ({
                body: comment,
                url: `/comment/${itemId}`,
                method: 'POST'
            }),
            invalidatesTags: () => ['Item', 'Collection', 'Collections']
        }),
        deleteComment: builder.mutation<string, number>({
            query: (commentId) => ({
                url: `/comment/`,
                method: 'DELETE',
                body: { commentId }
            }),
            invalidatesTags: () => ['Item', 'Collection', 'Collections']
        }),
        getUserComments: builder.query<ICommentWithItem[], number>({
            query: (limit) => ({
                url: `/comment/user/${limit}`,
                method: 'GET'
            }),
            providesTags: ['Item', 'Collection']
        })
    })
});

export const { useAddCommentMutation, useDeleteCommentMutation, useGetUserCommentsQuery } = commentsApi;
