import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { variables } from '../../helpers/variables';

export interface settingsState {
    theme: string;
    language: number;
}

const initialState: settingsState = {
    theme: localStorage.getItem(variables.THEME_LOCALSTORAGE) || 'dark',
    language: Number.parseInt(localStorage.getItem(variables.LANGUAGE_LOCALSTORAGE) || '1')
};

export const pageSettingsSlice = createSlice({
    name: 'pageSettings',
    initialState,
    reducers: {
        setTheme: (state, { payload: theme }: PayloadAction<string>) => {
            state.theme = theme;
            localStorage.setItem(variables.THEME_LOCALSTORAGE, theme);
        },
        setLanguage: (state, { payload: language }: PayloadAction<number>) => {
            state.language = language;
            localStorage.setItem(variables.LANGUAGE_LOCALSTORAGE, language.toString());
        }
    }
});

export const { actions, reducer } = pageSettingsSlice;
