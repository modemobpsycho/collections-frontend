import { createTheme } from '@mui/material';
import { myColors } from './colors';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: myColors.blueLight
        },
        secondary: {
            main: myColors.white,
            dark: myColors.backgroundCardDark
        },
        info: {
            light: myColors.greenLight,
            main: myColors.green,
            dark: myColors.greenDark
        },
        background: {
            default: myColors.blackLight
        },
        text: {
            primary: myColors.white
        }
    },
    typography: {
        fontFamily: 'sans-serif'
    }
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: myColors.blue
        },
        secondary: {
            main: myColors.white,
            dark: myColors.backgroundCardLight
        },
        info: {
            light: myColors.greenLight,
            main: myColors.green,
            dark: myColors.greenDark
        },
        background: {
            default: myColors.white
        },
        text: {
            primary: myColors.black
        }
    },
    typography: {
        fontFamily: 'sans-serif'
    }
});
