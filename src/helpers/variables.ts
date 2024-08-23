export const variables = {
    API_URL: 'https://collections-backend-jkri.onrender.com/api',
    BACKEND_URL: 'https://collections-backend-jkri.onrender.com/',
    SOCKET_URL: 'https://collections-backend-jkri.onrender.com',
    USER_LOCALSTORAGE: 'accessToken',
    THEME_LOCALSTORAGE: 'page_theme',
    ASPECT_RATIO: 16 / 9,
    LANGUAGE_LOCALSTORAGE: 'page_language',
    ITEMS_INC: 5,
    ITEMS_MIN: 5,
    ITEMS_MAX: 15,
    ITEMS_PAGE_INC: 4,
    ITEMS_PAGE_MIN: 4,
    COLLECTIONS_INC: 6,
    COLLECTIONS_MIN: 6,
    USER_COLLECTIONS_MIN: 3,
    USER_COLLECTIONS_INC: 3,
    USER_COLLECTIONS_MAX: 100,
    COMMENTS_REACTIONS_MIN: 7,
    COMMENTS_REACTIONS_MAX: 77,
    COMMENTS_REACTIONS_INC: 7,
    SEARCH_MIN: 9,
    SEARCH_INC: 6,
    GET_ACCESS_TOKEN: () => {
        return localStorage.getItem('accessToken');
    }
};
