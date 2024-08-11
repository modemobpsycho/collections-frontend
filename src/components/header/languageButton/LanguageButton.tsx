import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { FormattedMessage } from 'react-intl';
import { useActions } from '../../../hooks/useActions';

function LanguageButton() {
    const { setLanguage } = useActions();

    const [anchorElLanguage, setAnchorElLanguage] = useState<Element | null>(null);

    const handleMenuLanguageClick = (event: React.MouseEvent) => {
        setAnchorElLanguage(event.currentTarget as Element);
    };

    const handleLanguageMenuItemClick = (selectedLanguage: number) => {
        setLanguage(selectedLanguage);
        setAnchorElLanguage(null);
    };

    const handleClose = () => {
        setAnchorElLanguage(null);
    };

    return (
        <>
            <Button color="inherit" onClick={handleMenuLanguageClick}>
                <LanguageIcon />
            </Button>
            <Menu
                anchorEl={anchorElLanguage}
                open={Boolean(anchorElLanguage)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleLanguageMenuItemClick(0)}>
                    <FormattedMessage id="en_lang" />
                </MenuItem>
                <MenuItem onClick={() => handleLanguageMenuItemClick(1)}>
                    <FormattedMessage id="ru_lang" />
                </MenuItem>
            </Menu>
        </>
    );
}

export default LanguageButton;
