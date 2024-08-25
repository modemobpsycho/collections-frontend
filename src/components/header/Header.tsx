import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import { IconButton, List, ListItem, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import ThemeButton from './themeButton/ThemeButton';
import LanguageButton from './languageButton/LanguageButton';
import { FormattedMessage, useIntl } from 'react-intl';
import { useOptionsState, useUserState } from '@/hooks/useStoreState';
import { useDispatch } from 'react-redux';
import { baseApi } from '@/stores/api/baseApi';
import { useRef, useState } from 'react';
import { useGetTagsQuery } from '@/stores/api/tags.api';
import ClearIcon from '@mui/icons-material/Clear';

export default function Header() {
    const { theme } = useOptionsState();
    const navigate = useNavigate();
    const { logout, showSnackbar } = useActions();
    const intl = useIntl();
    const inputSearch = useRef<HTMLInputElement>(null);
    const { token } = useUserState();
    const dispatch = useDispatch();
    const [searchStr, setSearchStr] = useState('');
    const [isShow, setIsShow] = useState(false);
    const { data } = useGetTagsQuery(
        { contain: searchStr, limit: 7 },
        {
            skip: searchStr === ''
        }
    );

    const tagHandler = (tag: string) => {
        navigate('/search/' + tag);
        setSearchStr(tag);
        if (inputSearch.current) inputSearch.current.value = tag;
    };

    const cancelHandler = () => {
        setSearchStr('');
        if (inputSearch.current) inputSearch.current.value = '';
    };

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
                            <AppsIcon
                                sx={{
                                    fontSize: '30px'
                                }}
                            />
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

                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '400px'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '5px',
                                backgroundColor: (theme) => theme.palette.secondary.dark,
                                height: '40px',
                                width: '100%'
                            }}
                        >
                            <TextField
                                type="text"
                                variant="outlined"
                                size="small"
                                placeholder={intl.formatMessage({ id: 'Search' })}
                                aria-label="Search"
                                onChange={(e) => setSearchStr(e.target.value)}
                                onFocus={() => setIsShow(true)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') tagHandler(searchStr);
                                }}
                                onBlur={() => {
                                    setTimeout(() => setIsShow(false), 300);
                                }}
                                inputRef={inputSearch}
                                sx={{
                                    flex: 1,
                                    fontSize: '16px',
                                    border: 'none',
                                    outline: 'none',
                                    backgroundColor: 'transparent'
                                }}
                                inputProps={{ maxLength: 100 }}
                            />
                            <IconButton
                                color="primary"
                                aria-label="search"
                                sx={{ padding: '8px' }}
                                onClick={() => tagHandler(searchStr)}
                            >
                                <SearchIcon />
                            </IconButton>
                            <IconButton
                                color="primary"
                                aria-label="clear"
                                sx={{ padding: '8px' }}
                                onClick={cancelHandler}
                            >
                                <ClearIcon />
                            </IconButton>
                        </Box>
                        {isShow && (
                            <List
                                onClick={() => setIsShow(false)}
                                id="searchList"
                                className="list-group position-absolute search-list"
                                sx={{
                                    backgroundColor: (theme) => theme.palette.secondary.dark,
                                    borderRadius: '5px',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                    marginTop: '5px',
                                    padding: '10px',
                                    listStyleType: 'none',
                                    width: '100%',
                                    zIndex: 999
                                }}
                            >
                                {data &&
                                    searchStr !== '' &&
                                    data.length > 0 &&
                                    data.map((tag) => (
                                        <ListItem
                                            className="list-group-item cursor-pointer text-truncate"
                                            onClick={() => tagHandler(tag.tag)}
                                            key={tag.id}
                                            sx={{
                                                marginBottom: '5px',
                                                backgroundColor: (theme) => theme.palette.secondary.dark,
                                                '&:hover': {
                                                    backgroundColor: (theme) => theme.palette.secondary.light
                                                }
                                            }}
                                        >
                                            <Typography
                                                className="dropdown-item text-truncate"
                                                sx={{
                                                    color: (theme) => theme.palette.text.primary,
                                                    backgroundColor: 'transparent',
                                                    '&:hover': {
                                                        backgroundColor: (theme) => theme.palette.secondary.light
                                                    }
                                                }}
                                            >
                                                {tag.tag}
                                            </Typography>
                                        </ListItem>
                                    ))}
                            </List>
                        )}
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
                                        showSnackbar('Logout_successfully');
                                    }}
                                    sx={{ marginRight: '5px', marginLeft: '10px' }}
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
