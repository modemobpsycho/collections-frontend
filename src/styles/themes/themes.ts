import { createTheme } from '@mui/material';
import { myColors } from './colors';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: myColors.blueLight
        },
        secondary: {
            main: myColors.white
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
    }
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: myColors.blue
        },
        secondary: {
            main: myColors.white
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
    }
});
