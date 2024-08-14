import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { variables } from '@/helpers/variables';
import { ICollection } from '@/types/collection.interface';

export interface userState {
    token?: string;
    collections?: ICollection[];
}

const initialState: userState = {
    token: localStorage.getItem(variables.USER_LOCALSTORAGE) || undefined
};

export const userSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem(variables.USER_LOCALSTORAGE);
            state.token = undefined;
        },
        setUser: (state, { payload: token }: PayloadAction<string>) => {
            state.token = token;
            localStorage.setItem(variables.USER_LOCALSTORAGE, token);
        },
        setCollections: (state, { payload: collections }: PayloadAction<ICollection[]>) => {
            if (state.token) state.collections = collections;
        }
    }
});

export const { actions, reducer } = userSlice;
