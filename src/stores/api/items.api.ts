import { IItem, IItemWithFields } from '@/types/item.interface';
import { baseApi } from './baseApi';

export const itemsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addItem: builder.mutation<string, { item: Omit<IItem, 'id'>; collectionId: number }>({
            query: ({ item, collectionId }) => ({
                body: item,
                url: `/item/${collectionId}`,
                method: 'POST'
            }),
            invalidatesTags: () => ['Collection', 'Items']
        }),
        getItems: builder.query<IItemWithFields[], number>({
            query: (collectionId) => ({
                url: `/item/all/${collectionId}`,
                method: 'GET'
            }),
            providesTags: () => ['Item']
        }),
        getItem: builder.query<IItem, string>({
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
            invalidatesTags: () => ['Collection', 'Item']
        }),
        deleteItem: builder.mutation<string, number>({
            query: (itemId) => ({
                url: `/item/${itemId}`,
                method: 'DELETE'
            }),
            invalidatesTags: () => ['Collection', 'Item']
        })
    })
});

export const { useAddItemMutation, useGetItemsQuery, useUpdateItemMutation, useDeleteItemMutation, useGetItemQuery } =
    itemsApi;
