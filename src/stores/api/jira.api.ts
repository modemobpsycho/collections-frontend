import { IJiraCreate, IJiraTicket } from '@/types/jira.interface';
import { baseApi } from './baseApi';

export const jiraApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createTicket: builder.mutation<string, IJiraCreate>({
            query: (ticket) => ({
                body: ticket,
                url: '/jira/create',
                method: 'POST'
            }),
            invalidatesTags: () => ['Jira']
        }),
        getTicket: builder.query<string, string>({
            query: (ticketId) => ({
                url: `/jira/ticket/${ticketId}`,
                method: 'GET'
            })
        }),
        getTickets: builder.query<IJiraTicket[], number>({
            query: (limit) => ({
                url: `/jira/getAll/${limit}`,
                method: 'GET'
            }),
            providesTags: () => ['Jira']
        }),
        createAccountJira: builder.mutation<string, string>({
            query: (email) => ({
                body: { email },
                url: '/jira/account',
                method: 'POST'
            })
        })
    })
});

export const { useCreateAccountJiraMutation, useCreateTicketMutation, useGetTicketQuery, useGetTicketsQuery } = jiraApi;
