declare module '*.jpg';
declare module '*.png';

declare type RootState = ReturnType<typeof import('../stores/store.ts').store.getState>;
declare type AppDispatch = typeof import('../stores/store.ts').store.dispatch;
