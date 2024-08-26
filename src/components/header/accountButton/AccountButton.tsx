import { IconButton, Menu, MenuItem } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { baseApi } from '@/stores/api/baseApi';

function AccountButton() {
    const [anchorElAccount, setAnchorElAccount] = useState<Element | null>(null);
    const { logout, showSnackbar } = useActions();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleMenuAccountClick = (event: React.MouseEvent) => {
        setAnchorElAccount(event.currentTarget as Element);
    };

    const handleLogout = () => {
        logout();
        dispatch(baseApi.util.resetApiState());
        showSnackbar('Logout_successfully');
        setAnchorElAccount(null);
    };

    const handleClose = () => {
        setAnchorElAccount(null);
    };

    return (
        <>
            <IconButton color="inherit" onClick={handleMenuAccountClick} sx={{ padding: '3px' }}>
                <AccountCircleIcon className="header-wrapper-settings-icon" />
            </IconButton>
            <Menu anchorEl={anchorElAccount} open={Boolean(anchorElAccount)} onClose={handleClose}>
                <MenuItem onClick={() => navigate('/cabinet')}>
                    <FormattedMessage id="Account" />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <FormattedMessage id="Log_out" />
                </MenuItem>
            </Menu>
        </>
    );
}

export default AccountButton;
