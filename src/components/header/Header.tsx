import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import { Input } from '@mui/material';
import { Link } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import ThemeButton from './themeButton/ThemeButton';
import LanguageButton from './languageButton/LanguageButton';
import { FormattedMessage, useIntl } from 'react-intl';
import { useOptionsState, useUserState } from '@/hooks/useStoreState';
import { useDispatch } from 'react-redux';
import { baseApi } from '@/stores/api/baseApi';

export default function Header() {
    const { theme } = useOptionsState();
    const { logout } = useActions();
    const intl = useIntl();
    const { token } = useUserState();
    const dispatch = useDispatch();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={theme === 'dark' ? 'primary' : 'bg-dark'}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        justifyContent: 'space-between',
                        flexGrow: 1
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            color="inherit"
                            component={Link}
                            to="/"
                            variant="h6"
                            sx={{ textDecoration: 'none' }}
                        >
                            Collections by Vadim Taratuta
                        </Typography>

                        <Box
                            sx={{
                                marginLeft: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px'
                            }}
                        >
                            <AppsIcon sx={{ fontSize: '30px' }} />
                            <Typography
                                color="inherit"
                                component={Link}
                                to="/"
                                variant="h6"
                                sx={{
                                    textDecoration: 'none'
                                }}
                            >
                                <FormattedMessage id="Home" />
                            </Typography>
                            <Typography
                                color="inherit"
                                component={Link}
                                to="/collections"
                                variant="h6"
                                sx={{
                                    textDecoration: 'none'
                                }}
                            >
                                <FormattedMessage id="All_collections" />
                            </Typography>
                            {token && (
                                <Typography
                                    color="inherit"
                                    component={Link}
                                    to="/my-collections"
                                    variant="h6"
                                    sx={{
                                        textDecoration: 'none'
                                    }}
                                >
                                    <FormattedMessage id="My_collections" />
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Input
                            placeholder={intl.formatMessage({ id: 'Search' })}
                            inputProps={{ 'aria-label': 'Search' }}
                            sx={{
                                borderRadius: '5px',
                                height: '30px',
                                marginRight: '10px',
                                color: theme === 'dark' ? 'white' : 'black',
                                backgroundColor: theme === 'dark' ? 'inherit' : 'white'
                            }}
                        />
                        <SearchIcon />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {!token ? (
                            <Button variant="outlined" component={Link} to="/login">
                                <FormattedMessage id="Join" />
                            </Button>
                        ) : (
                            <>
                                <Button color="primary" variant="outlined" component={Link} to="/cabinet">
                                    <FormattedMessage id="Account" />
                                </Button>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    component={Link}
                                    to="/login"
                                    onClick={() => {
                                        logout();
                                        dispatch(baseApi.util.resetApiState());
                                    }}
                                >
                                    <FormattedMessage id="Log_out" />
                                </Button>
                            </>
                        )}
                        <ThemeButton />
                        <LanguageButton />
                    </Box>
                </Box>
            </AppBar>
        </Box>
    );
}
