import { IUser } from '../../types/user.interface';
import { IUserLoginInfo } from '../../types/userLoginInfo.interface';
import { IUserRegisterInfo } from '../../types/userRegisterInfo.interface';
import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation<IUser | string, IUserLoginInfo>({
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
        })
    })
});

export const { useLoginUserMutation, useSignupUserMutation } = userApi;
