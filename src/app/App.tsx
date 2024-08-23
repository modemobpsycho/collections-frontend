import { AppRouter } from '../routers/appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from '../styles/themes/themes';
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../i18n/locales';
import { messages } from '../i18n/messages';
import { IMessages } from '../types/messages.interface';
import CssBaseline from '@mui/material/CssBaseline';
import { useOptionsState } from '../hooks/useStoreState';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MySnackbar from '@/components/snackbar/MySnackbar';

function App() {
    const { theme, language } = useOptionsState();
    return (
        <div className="app">
            <GoogleOAuthProvider
                clientId={process.env.VITE_REACT_APP_GOOGLE_CLIENT_ID as string}
                key={process.env.VITE_REACT_APP_GOOGLE_SECRET}
            >
                <IntlProvider
                    locale={language === 0 ? LOCALES.ENGLISH : LOCALES.RUSSIAN}
                    defaultLocale={LOCALES.ENGLISH}
                    messages={messages[language === 0 ? LOCALES.ENGLISH : LOCALES.RUSSIAN] as unknown as IMessages}
                >
                    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
                        <CssBaseline />
                        <MySnackbar />
                        <AppRouter />
                    </ThemeProvider>
                </IntlProvider>
            </GoogleOAuthProvider>
        </div>
    );
}

export default App;
