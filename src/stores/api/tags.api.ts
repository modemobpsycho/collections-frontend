import { ITag } from '@/types/tag.interface';
import { baseApi } from './baseApi';

export const tagsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTags: builder.query<ITag[], { contain: string; limit: number }>({
            query: ({ contain, limit }) => ({
                url: `/tag/get/${contain}/${limit}`,
                method: 'GET'
            })
        }),
        getLastTags: builder.query<ITag[], number>({
            query: (limit) => ({
                url: `/tag/getLast/${limit}`,
                method: 'GET'
            }),
            providesTags: () => ['Tag']
        })
    })
});

export const { useGetTagsQuery, useGetLastTagsQuery } = tagsApi;
