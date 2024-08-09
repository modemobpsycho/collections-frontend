import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Input } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import ThemeButton from '../../elements/themeButton/ThemeButton';
import LanguageButton from '../../elements/languageButton/LanguageButton';
import { FormattedMessage, useIntl } from 'react-intl';

export default function Header() {
    const { user } = useSelector((state: RootState) => state.user);
    const { theme } = useSelector((state: RootState) => state.options);
    const intl = useIntl();
    const { logout } = useActions();

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
                        <Typography variant="h6">
                            <FormattedMessage id="header_brand" />
                        </Typography>

                        <Box
                            sx={{
                                marginLeft: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px'
                            }}
                        >
                            <MenuIcon sx={{ fontSize: '30px' }} />
                            <Typography
                                color="inherit"
                                component={Link}
                                to="/"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    textDecoration: 'none'
                                }}
                            >
                                <FormattedMessage id="home" />
                            </Typography>
                            <Typography
                                color="inherit"
                                component={Link}
                                to="/collections"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    textDecoration: 'none'
                                }}
                            >
                                <FormattedMessage id="all_collections" />
                            </Typography>
                            {user && (
                                <Typography
                                    color="inherit"
                                    component={Link}
                                    to="/my-collections"
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <FormattedMessage id="my_collections" />
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Input
                            placeholder={intl.formatMessage({ id: 'search' })}
                            inputProps={{ 'aria-label': 'search' }}
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
                        {!user ? (
                            <Button variant="outlined" component={Link} to="/login">
                                <FormattedMessage id="join" />
                            </Button>
                        ) : (
                            <>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    component={Link}
                                    to="/cabinet"
                                >
                                    <FormattedMessage id="account" />
                                </Button>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    component={Link}
                                    to="/login"
                                    onClick={() => logout()}
                                >
                                    <FormattedMessage id="logout" />
                                </Button>
                            </>
                        )}
                        <LanguageButton />
                        <ThemeButton />
                    </Box>
                </Box>
            </AppBar>
        </Box>
    );
}
