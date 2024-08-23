import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface settingsState {
    text: string;
    isOpen: boolean;
}

const initialState: settingsState = {
    text: '',
    isOpen: false
};

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (state, { payload }: PayloadAction<string>) => {
            state.text = payload ?? 'Unexpected error';
            state.isOpen = true;
        },
        closeSnackbar: (state) => {
            state.isOpen = false;
        }
    }
});

export const { actions, reducer } = snackbarSlice;
