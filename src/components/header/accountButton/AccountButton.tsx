import { Button, CircularProgress, IconButton, InputLabel, Menu, MenuItem, Select, TextField } from '@mui/material';
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
    const [createTicket, { isLoading: isLoadingTicket }] = useCreateTicketMutation();
    const { logout, showSnackbar } = useActions();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        priority: ''
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
            showSnackbar('Your_request_has_been_successfully_sent_to_the_support_service');
            setFormData({ title: '', description: '', type: '', priority: '' });
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
                    <MenuItem value="Bug">
                        <FormattedMessage id="Bug" />
                    </MenuItem>
                    <MenuItem value="Feature">
                        <FormattedMessage id="Feature" />
                    </MenuItem>
                    <MenuItem value="Question">
                        <FormattedMessage id="Question" />
                    </MenuItem>
                </Select>
                <InputLabel sx={{ marginTop: '10px' }}>
                    <FormattedMessage id="Priority" />
                </InputLabel>
                <Select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                    <MenuItem value="Lowest">
                        <FormattedMessage id="Lowest" />
                    </MenuItem>
                    <MenuItem value="Low">
                        <FormattedMessage id="Low" />
                    </MenuItem>
                    <MenuItem value="Medium">
                        <FormattedMessage id="Medium" />
                    </MenuItem>
                    <MenuItem value="High">
                        <FormattedMessage id="High" />
                    </MenuItem>
                    <MenuItem value="Highest">
                        <FormattedMessage id="Highest" />
                    </MenuItem>
                </Select>
                <Button
                    sx={{ marginTop: '10px' }}
                    variant="contained"
                    onClick={handleSendSupport}
                    disabled={isLoadingTicket || !formData.title || !formData.description}
                >
                    {isLoadingTicket ? <CircularProgress size={25} /> : <FormattedMessage id="Send" />}
                </Button>
            </ModalWindow>
        </>
    );
}

export default AccountButton;
