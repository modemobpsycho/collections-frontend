import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from './slices/user.slice';
import { reducer as optionsReducer } from './slices/pageSettings.slice';
import { baseApi } from './api/baseApi';

const reducers = combineReducers({
    user: userReducer,
    options: optionsReducer,
    [baseApi.reducerPath]: baseApi.reducer
});

export const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
