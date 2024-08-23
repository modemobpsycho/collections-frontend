import { IItem, IItemInfo, IItemWithFields } from '@/types/item.interface';
import { baseApi } from './baseApi';

export const itemsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addItem: builder.mutation<string, { item: Omit<IItem, 'id'>; collectionId: number }>({
            query: ({ item, collectionId }) => ({
                body: item,
                url: `/item/${collectionId}`,
                method: 'POST'
            }),
            invalidatesTags: () => ['Collection', 'Items', 'Collections', 'Tag']
        }),
        getItems: builder.query<IItemWithFields[], { collectionId: string; limit: number }>({
            query: ({ collectionId, limit }) => ({
                url: `/item/all/${collectionId}/${limit}`,
                method: 'GET'
            }),
            providesTags: () => ['Item']
        }),
        getItem: builder.query<IItemInfo, string>({
            query: (itemId) => ({
                url: `/item/${itemId}`,
                method: 'GET'
            }),
            providesTags: () => ['Collection', 'Item']
        }),
        updateItem: builder.mutation<string, { item: IItem; itemId: number }>({
            query: ({ item, itemId }) => ({
                body: item,
                url: `/item/${itemId}`,
                method: 'PUT'
            }),
            invalidatesTags: () => ['Collection', 'Item', 'Collections']
        }),
        deleteItem: builder.mutation<string, number>({
            query: (itemId) => ({
                url: `/item/${itemId}`,
                method: 'DELETE'
            }),
            invalidatesTags: () => ['Collection', 'Item', 'Collections', 'Tag']
        }),
        searchItems: builder.query<IItem[], { contain: string; limit: number }>({
            query: ({ contain, limit }) => ({
                url: `/item/search/${contain}/${limit}`,
                method: 'GET'
            })
        }),
        getLastItems: builder.query<IItemInfo[] | string, number>({
            query: (limit) => ({
                url: `/item/getLast/${limit}`,
                method: 'GET'
            }),
            providesTags: () => ['Item', 'Collection']
        })
    })
});

export const {
    useAddItemMutation,
    useGetItemsQuery,
    useUpdateItemMutation,
    useSearchItemsQuery,
    useDeleteItemMutation,
    useGetItemQuery,
    useGetLastItemsQuery
} = itemsApi;
