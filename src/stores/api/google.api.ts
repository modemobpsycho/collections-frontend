import { baseApi } from './baseApi';

const googleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserInfoGoogle: builder.query<string, void>({
            query: (accessToken) => ({
                url: `https://www.googleapis.com/oauth2/v3/userinfo`,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }),
        loginUserGoogle: builder.mutation({
            query: (userInfo) => ({
                url: '/user/login-google',
                method: 'POST',
                body: userInfo
            })
        })
    })
});

export const { useGetUserInfoGoogleQuery, useLoginUserGoogleMutation } = googleApi;
