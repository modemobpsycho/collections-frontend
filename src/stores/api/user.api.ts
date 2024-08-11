import {
    IUser,
    IUserDeleteInfo,
    IUserLoginInfo,
    IUserRegisterInfo,
    IUserUpdateInfo
} from '../../types/user.interface';
import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation<string, IUserLoginInfo>({
            query: (userInfo: IUserLoginInfo) => ({
                body: userInfo,
                url: '/user/login',
                method: 'POST'
            }),
            invalidatesTags: () => [
                {
                    type: 'Collections'
                }
            ]
        }),
        signupUser: builder.mutation<string, IUserRegisterInfo>({
            query: (userInfo: IUserRegisterInfo) => ({
                body: userInfo,
                url: '/user/signup',
                method: 'POST'
            })
        }),
        deleteUser: builder.mutation<string, IUserDeleteInfo>({
            query: (userInfo: IUserDeleteInfo) => ({
                body: userInfo,
                url: '/user/delete',
                method: 'DELETE'
            })
        }),
        updateUser: builder.mutation<string, IUserUpdateInfo>({
            query: (userInfo: IUserUpdateInfo) => ({
                body: userInfo,
                url: '/user/update',
                method: 'PUT'
            }),
            invalidatesTags: ['User']
        }),
        getUser: builder.query<IUser, void>({
            query: () => ({
                url: '/user/me',
                method: 'GET'
            }),
            providesTags: ['User']
        })
    })
});

export const {
    useLoginUserMutation,
    useSignupUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useGetUserQuery
} = userApi;
