import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { useActions } from '@/hooks/useActions';

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
            <IconButton color="inherit" onClick={handleMenuLanguageClick} sx={{ padding: '0', marginRight: '20px' }}>
                <LanguageIcon sx={{ fontSize: '30px' }} />
            </IconButton>
            <Menu anchorEl={anchorElLanguage} open={Boolean(anchorElLanguage)} onClose={handleClose}>
                <MenuItem onClick={() => handleLanguageMenuItemClick(0)}>English</MenuItem>
                <MenuItem onClick={() => handleLanguageMenuItemClick(1)}>Русский</MenuItem>
            </Menu>
        </>
    );
}

export default LanguageButton;
