export const variables = {
    API_URL: 'http://localhost:3000/api',
    USER_LOCALSTORAGE: 'accessToken',
    THEME_LOCALSTORAGE: 'page_theme',
    LANGUAGE_LOCALSTORAGE: 'page_language',
    GET_ACCESS_TOKEN: () => {
        return localStorage.getItem('accessToken');
    }
};
