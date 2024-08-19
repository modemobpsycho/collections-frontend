import { ICollection, ICollectionCreate } from '@/types/collection.interface';
import { baseApi } from './baseApi';

export const collectionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCollections: builder.query<ICollection[], void>({
            query: () => ({
                url: '/collection/getAll',
                method: 'GET'
            }),
            providesTags: () => ['Collections']
        }),
        getMyCollections: builder.query<ICollection[], void>({
            query: () => ({
                url: '/collection/me',
                method: 'GET'
            }),
            providesTags: () => ['Collections']
        }),
        getCollectionInfo: builder.query<ICollection, string>({
            query: (id) => ({
                url: `/collection/${id}`,
                method: 'GET'
            }),
            providesTags: () => ['Collections']
        }),
        deleteCollection: builder.mutation<string, number>({
            query: (id) => ({
                url: `/collection/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: () => ['Collections']
        }),
        addCollection: builder.mutation<string, ICollectionCreate>({
            query: (collection) => ({
                body: collection,
                url: '/collection/create',
                method: 'POST'
            }),
            invalidatesTags: () => ['Collections']
        }),
        changeCollection: builder.mutation<string, ICollection>({
            query: (collection) => ({
                body: collection,
                url: `/collection/${collection.id}`,
                method: 'PUT'
            }),
            invalidatesTags: () => ['Collections', 'Collection']
        }),
        addCollectionImage: builder.mutation<string, FormData>({
            query: (imageData) => ({
                body: imageData,
                url: '/collection/savePhoto',
                method: 'POST'
            }),
            invalidatesTags: () => ['Collections', 'Collection']
        }),
        getBiggestCollections: builder.query<ICollection[], void>({
            query: () => ({
                url: '/collection/biggest',
                method: 'GET'
            }),
            providesTags: () => ['Collections']
        })
    })
});

export const {
    useAddCollectionMutation,
    useGetCollectionsQuery,
    useAddCollectionImageMutation,
    useChangeCollectionMutation,
    useGetMyCollectionsQuery,
    useGetCollectionInfoQuery,
    useGetBiggestCollectionsQuery,
    useDeleteCollectionMutation
} = collectionApi;
