import {
    IUser,
    IUserDeleteInfo,
    IUserLoginInfo,
    IUserRegisterInfo,
    IUserUpdateAdminInfo,
    IUserUpdateInfo
} from '@/types/user.interface';
import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation<string, IUserLoginInfo>({
            query: (userInfo: IUserLoginInfo) => ({
                body: userInfo,
                url: '/user/login',
                method: 'POST'
            }),
            invalidatesTags: () => ['Collections']
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
            }),
            invalidatesTags: ['Users', 'Collections']
        }),
        updateUser: builder.mutation<string, IUserUpdateInfo>({
            query: (userInfo: IUserUpdateInfo) => ({
                body: userInfo,
                url: '/user/update',
                method: 'PUT'
            }),
            invalidatesTags: ['User', 'Users', 'Collections']
        }),
        updateUserAdmin: builder.mutation<string | IUserUpdateAdminInfo, IUserUpdateAdminInfo>({
            query: (userInfo) => ({
                body: userInfo,
                url: '/user/update-admin',
                method: 'PUT'
            }),
            invalidatesTags: ['User', 'Users', 'Collections']
        }),
        getUser: builder.query<IUser, void>({
            query: () => ({
                url: '/user/me',
                method: 'GET'
            }),
            providesTags: ['User']
        }),
        getAllUsers: builder.query<IUser[], void>({
            query: () => ({
                url: '/user/',
                method: 'GET'
            }),
            providesTags: () => ['Users']
        })
    })
});

export const {
    useLoginUserMutation,
    useSignupUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useUpdateUserAdminMutation,
    useGetUserQuery,
    useGetAllUsersQuery
} = userApi;
