import { useSelector } from 'react-redux';
import { AppRouter } from '../routers/appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from '../styles/themes/themes';
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../i18n/locales';
import { messages } from '../i18n/messages';
import { IMessages } from '../types/messages.interface';

function App() {
    const theme = useSelector((state: RootState) => state.options.theme);
    const locale = useSelector((state: RootState) => state.options.language);

    return (
        <div className="app">
            <IntlProvider
                messages={messages[locale === 0 ? LOCALES.ENGLISH : LOCALES.RUSSIAN] as IMessages}
                locale={locale === 0 ? LOCALES.ENGLISH : LOCALES.RUSSIAN}
                defaultLocale={LOCALES.ENGLISH}
            >
                <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
                    <CssBaseline />
                    <AppRouter />
                </ThemeProvider>
            </IntlProvider>
        </div>
    );
}

export default App;
