import { Button, Menu, MenuItem } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch, useSelector } from 'react-redux';
import { SetStateAction, useState } from 'react';
import { actions } from '../../stores/slices/pageSettings.slice';
import { FormattedMessage } from 'react-intl';

function ThemeButton() {
    const dispatch = useDispatch();

    const { theme } = useSelector((state: RootState) => state.options);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event: SetStateAction<RootState>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (selectedTheme: string) => {
        dispatch(actions.setTheme(selectedTheme));
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button color="inherit" onClick={handleMenuClick}>
                {theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => handleMenuItemClick('dark')}>
                    <FormattedMessage id="dark_theme" />
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('light')}>
                    <FormattedMessage id="light_theme" />
                </MenuItem>
            </Menu>
        </>
    );
}

export default ThemeButton;
