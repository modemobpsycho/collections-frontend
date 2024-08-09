import { Button, Menu, MenuItem } from '@mui/material';
import { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../stores/slices/pageSettings.slice';
import LanguageIcon from '@mui/icons-material/Language';
import { FormattedMessage } from 'react-intl';

function LanguageButton() {
    const dispatch = useDispatch();

    const [anchorElLanguage, setAnchorElLanguage] = useState(null);

    const handleMenuLanguageClick = (event: SetStateAction<RootState>) => {
        setAnchorElLanguage(event.currentTarget);
    };

    const handleLanguageMenuItemClick = (selectedLanguage: number) => {
        dispatch(actions.setLanguage(selectedLanguage));
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
