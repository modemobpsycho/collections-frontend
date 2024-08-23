import { baseApi } from './baseApi';

const githubApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCodeGithub: builder.mutation<string, { client_id: string; redirect_uri: string }>({
            query: ({ client_id, redirect_uri }) => ({
                url: `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }),
        accessAuthGithub: builder.mutation({
            query: ({ clientID, clientSecret, requestToken }) => ({
                url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
                method: 'POST'
            })
        }),
        getUserInfoGithub: builder.mutation({
            query: (accessToken) => ({
                url: `https://api.github.com/user`,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }),
        loginUserGithub: builder.mutation({
            query: (userInfo) => ({
                url: '/user/login-github',
                method: 'POST',
                body: userInfo
            })
        })
    })
});

export const {
    useGetCodeGithubMutation,
    useAccessAuthGithubMutation,
    useLoginUserGithubMutation,
    useGetUserInfoGithubMutation
} = githubApi;
