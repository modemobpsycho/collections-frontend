import { AppRouter } from '../routers/appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from '../styles/themes/themes';
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../i18n/locales';
import { messages } from '../i18n/messages';
import { IMessages } from '../types/messages.interface';

import CssBaseline from '@mui/material/CssBaseline';
import { useOptionsState } from '../hooks/useStoreState';

function App() {
    const { theme, language } = useOptionsState();

    return (
        <div className="app">
            <IntlProvider
                messages={messages[language === 0 ? LOCALES.ENGLISH : LOCALES.RUSSIAN] as IMessages}
                locale={language === 0 ? LOCALES.ENGLISH : LOCALES.RUSSIAN}
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
