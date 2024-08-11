import { ICollection } from '../../types/collection.interface';
import { baseApi } from './baseApi';

export const collectionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addCollection: builder.mutation<string, ICollection>({
            query: (collection) => ({
                body: collection,
                url: '/collection/create',
                method: 'POST'
            }),
            invalidatesTags: () => [
                {
                    type: 'Collections'
                }
            ]
        }),
        getCollections: builder.query<ICollection[], void>({
            query: () => ({
                url: '/collection/all',
                method: 'GET'
            }),
            providesTags: () => [
                {
                    type: 'Collections'
                }
            ]
        }),
        addCollectionImage: builder.mutation<string, FormData>({
            query: (imageData) => ({
                body: imageData,
                url: '/collection/saveCollectionPhoto',
                method: 'POST'
            })
        })
    })
});

export const { useAddCollectionMutation, useGetCollectionsQuery, useAddCollectionImageMutation } = collectionApi;
