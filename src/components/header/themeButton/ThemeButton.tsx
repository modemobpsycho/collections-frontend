import { Button, Menu, MenuItem } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useOptionsState } from '../../../hooks/useStoreState';
import { useActions } from '../../../hooks/useActions';

function ThemeButton() {
    const { theme } = useOptionsState();
    const { setTheme } = useActions();

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleMenuClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget as Element);
    };

    const handleMenuItemClick = (selectedTheme: string) => {
        setTheme(selectedTheme);
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
