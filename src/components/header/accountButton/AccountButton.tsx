import { Button, IconButton, InputLabel, Menu, MenuItem, Select, TextField } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { baseApi } from '@/stores/api/baseApi';
import ModalWindow from '@/components/modalWindow/ModalWindow';
import { useCreateTicketMutation } from '@/stores/api/jira.api';

function AccountButton() {
    const intl = useIntl();
    const [anchorElAccount, setAnchorElAccount] = useState<Element | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [createTicket, { isLoading }] = useCreateTicketMutation();
    const { logout, showSnackbar } = useActions();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'Bug',
        priority: 'Medium'
    });
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

    const handleCloseModal = () => {
        setShowModal(false);
        handleClose();
    };

    const handleOpenModal = () => {
        setShowModal(true);
        handleClose();
    };

    const handleSendSupport = async () => {
        if (formData.title && formData.description) {
            await createTicket({ ...formData, url: window.location.href });
            handleCloseModal();
        }
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
                <MenuItem onClick={handleOpenModal}>
                    <FormattedMessage id="Support" />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <FormattedMessage id="Log_out" />
                </MenuItem>
            </Menu>
            <ModalWindow open={showModal} onClose={handleCloseModal}>
                <InputLabel sx={{ marginTop: '10px' }}>
                    <FormattedMessage id="Title" />
                </InputLabel>
                <TextField
                    fullWidth
                    required
                    label={intl.formatMessage({ id: 'Title_support' })}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    inputProps={{
                        maxLength: 60
                    }}
                />
                <InputLabel sx={{ marginTop: '10px' }}>
                    <FormattedMessage id="Describe_your_problem_or_feature" />
                </InputLabel>
                <TextField
                    fullWidth
                    required
                    label={intl.formatMessage({ id: 'Description' })}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    multiline
                    inputProps={{
                        maxLength: 400
                    }}
                />
                <InputLabel sx={{ marginTop: '10px' }}>
                    <FormattedMessage id="Type" />
                </InputLabel>
                <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                    <MenuItem value="Bug">Bug</MenuItem>
                    <MenuItem value="Feature">Feature</MenuItem>
                </Select>
                <InputLabel sx={{ marginTop: '10px' }}>
                    <FormattedMessage id="Priority" />
                </InputLabel>
                <Select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                    <MenuItem value="Lowest">Lowest</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Highest">Highest</MenuItem>
                </Select>
                <Button
                    sx={{ marginTop: '10px' }}
                    variant="contained"
                    onClick={handleSendSupport}
                    disabled={isLoading || !formData.title || !formData.description}
                >
                    <FormattedMessage id="Send" />
                </Button>
            </ModalWindow>
        </>
    );
}

export default AccountButton;
