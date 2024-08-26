import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import { Backdrop, IconButton, List, ListItem, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ThemeButton from './themeButton/ThemeButton';
import LanguageButton from './languageButton/LanguageButton';
import AccountButton from './accountButton/AccountButton';
import { FormattedMessage, useIntl } from 'react-intl';
import { useOptionsState, useUserState } from '@/hooks/useStoreState';
import { useEffect, useRef, useState } from 'react';
import { useGetTagsQuery } from '@/stores/api/tags.api';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';

import './Header.scss';

export default function Header() {
    const { theme } = useOptionsState();
    const navigate = useNavigate();
    const burgerScreenWidth = 1024;
    const searchScreenWidth = 480;
    const intl = useIntl();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const inputSearch = useRef<HTMLInputElement>(null);
    const { token } = useUserState();
    const [searchStr, setSearchStr] = useState('');
    const [isShowBurger, setIsShowBurger] = useState(false);
    const [isShowSearch, setIsShowSearch] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const { data } = useGetTagsQuery(
        { contain: searchStr, limit: 7 },
        {
            skip: searchStr === ''
        }
    );

    useEffect(() => {
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
        return () => {
            window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
        };
    }, []);

    const tagHandler = (tag: string) => {
        navigate('/search/' + tag);
        setSearchStr(tag);
        if (inputSearch.current) inputSearch.current.value = tag;
    };

    const cancelHandler = () => {
        setSearchStr('');
        setIsShowSearch(false);
        if (inputSearch.current) inputSearch.current.value = '';
    };

    return (
        <AppBar position="static" className={theme === 'dark' ? 'primary' : 'bg-dark'}>
            <Box className={'header-wrapper'}>
                <IconButton
                    onClick={() => setIsShowBurger(!isShowBurger)}
                    sx={{ display: windowWidth > burgerScreenWidth ? 'none' : 'block', color: 'white' }}
                >
                    <MenuIcon className={'header-wrapper-urls-icon'} />
                </IconButton>
                <Backdrop
                    sx={{ zIndex: 950 }}
                    open={isShowBurger || isShowSearch}
                    onClick={() => {
                        setIsShowBurger(false);
                        setIsShowSearch(false);
                    }}
                />
                <Box
                    className={'header-wrapper-urls'}
                    sx={{
                        transform:
                            isShowBurger || windowWidth > burgerScreenWidth ? 'translateX(0)' : 'translateX(-100%);',
                        backgroundColor: (theme) =>
                            burgerScreenWidth < windowWidth ? 'transparent' : theme.palette.secondary.dark,
                        color: (theme) => (burgerScreenWidth < windowWidth ? 'white' : theme.palette.text.primary)
                    }}
                >
                    <IconButton
                        onClick={() => setIsShowBurger(false)}
                        sx={{
                            alignSelf: 'start'
                        }}
                    >
                        <AppsIcon
                            className={'header-wrapper-urls-icon'}
                            sx={{
                                color: (theme) =>
                                    burgerScreenWidth < windowWidth ? 'white' : theme.palette.text.primary
                            }}
                        />
                    </IconButton>
                    <Typography
                        className={'header-wrapper-urls-titles'}
                        component={Link}
                        to="/"
                        onClick={() => setIsShowBurger(false)}
                    >
                        Collections
                    </Typography>
                    <Typography
                        component={Link}
                        to="/collections"
                        className={'header-wrapper-urls-titles'}
                        onClick={() => setIsShowBurger(false)}
                    >
                        <FormattedMessage id="All_collections" />
                    </Typography>
                    {token && (
                        <Typography
                            component={Link}
                            to="/my-collections"
                            className={'header-wrapper-urls-titles'}
                            onClick={() => setIsShowBurger(false)}
                        >
                            <FormattedMessage id="My_collections" />
                        </Typography>
                    )}
                    <Typography
                        sx={{
                            display: burgerScreenWidth < windowWidth ? 'none' : 'block',
                            marginTop: 'auto',
                            color: 'gray',
                            textAlign: 'center'
                        }}
                        variant="body2"
                    >
                        Made by Vadim Taratuta
                        <br />
                        Special for Itransition
                    </Typography>
                </Box>
                <IconButton
                    onClick={() => setIsShowSearch(!isShowSearch)}
                    sx={{ marginLeft: 'auto', marginRight: '5px' }}
                >
                    <SearchIcon
                        className={'header-wrapper-settings-icon'}
                        sx={{
                            display: windowWidth > searchScreenWidth ? 'none' : 'block',
                            color: 'white'
                        }}
                    />
                </IconButton>

                <Box
                    className={'header-wrapper-search-wrapper'}
                    sx={{ display: isShowSearch || windowWidth > searchScreenWidth ? 'block' : 'none' }}
                >
                    <Box
                        className={'header-wrapper-search'}
                        sx={{
                            backgroundColor: (theme) => theme.palette.secondary.dark
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
                                if (e.key === 'Enter') {
                                    tagHandler(searchStr);
                                    setIsShowSearch(false);
                                }
                            }}
                            onBlur={() => {
                                setTimeout(() => setIsShow(false), 300);
                            }}
                            inputRef={inputSearch}
                            className="header-wrapper-search-input"
                            inputProps={{ maxLength: 100 }}
                        />
                        <IconButton
                            color="primary"
                            aria-label="search"
                            sx={{
                                padding: '8px'
                            }}
                            onClick={() => {
                                tagHandler(searchStr);
                                setIsShowSearch(false);
                            }}
                        >
                            <SearchIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="clear" sx={{ padding: '8px' }} onClick={cancelHandler}>
                            <ClearIcon />
                        </IconButton>
                    </Box>
                    {isShow && (
                        <List
                            onClick={() => setIsShow(false)}
                            id="searchList"
                            className="list-group position-absolute search-list header-wrapper-search-list-wrapper"
                            sx={{
                                backgroundColor: (theme) => theme.palette.secondary.dark,
                                borderRadius: '5px',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                marginTop: '5px',
                                padding: '10px',
                                listStyleType: 'none',
                                width: '100%',
                                zIndex: 950,
                                display: `${data?.length && data?.length > 0 && searchStr !== '' ? 'block' : 'none'}`
                            }}
                        >
                            {data &&
                                searchStr !== '' &&
                                data.length > 0 &&
                                data.map((tag) => (
                                    <ListItem
                                        className="list-group-item cursor-pointer text-truncate"
                                        onClick={() => {
                                            tagHandler(tag.tag);
                                            setIsShowSearch(false);
                                        }}
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

                <Box className={'header-wrapper-settings'}>
                    {!token ? (
                        <Button variant="outlined" component={Link} to="/login">
                            <FormattedMessage id="Join" />
                        </Button>
                    ) : (
                        <AccountButton />
                    )}
                    <LanguageButton />
                    <ThemeButton />
                </Box>
            </Box>
        </AppBar>
    );
}
