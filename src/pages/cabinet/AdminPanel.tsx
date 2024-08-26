import {
    Backdrop,
    Box,
    Card,
    CircularProgress,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
import AdminPanelUsers from './AdminPanelUsers';
import AdminPanelButtons from './AdminPanelButtons';
import { useGetAllUsersQuery, useGetUserQuery } from '@/stores/api/user.api';
import { useState } from 'react';
import { IUser } from '@/types/user.interface';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';

function AdminPanel() {
    const { data, isLoading } = useGetAllUsersQuery();
    const { data: user } = useGetUserQuery();
    const { showSnackbar } = useActions();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({
        id: 0,
        email: '',
        fullName: '',
        role: 0,
        access: true,
        password: ''
    });

    if (user && user.role === 0) {
        navigate('/cabinet');
        showSnackbar('You_are_not_administrator');
    }

    const setCurrentUserHandler = (user: IUser) => {
        setCurrentUser({
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            access: user.access,
            password: ''
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
        const { name, value } = event.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
                gap: '10px',
                width: '40%',
                margin: '20px auto',
                borderRadius: '10px',
                backgroundColor: 'backgroundCardDark'
            }}
        >
            {isLoading ? (
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                    <CircularProgress />
                </Backdrop>
            ) : (
                <AdminPanelUsers data={data} setCurrentUser={setCurrentUserHandler} />
            )}
            <Card sx={{ padding: '10px' }}>
                <Typography variant="h6" sx={{ marginBottom: '10px', textAlign: 'center' }}>
                    <FormattedMessage id="Current_user_data" />
                </Typography>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '50%' }}>
                        <InputLabel htmlFor="id">
                            <FormattedMessage id="ID" />
                        </InputLabel>
                        <TextField id="id" sx={{ color: 'black' }} disabled value={currentUser.id} />
                        <InputLabel htmlFor="fullName">
                            <FormattedMessage id="Full_Name" />
                        </InputLabel>
                        <TextField
                            id="fullName"
                            type="text"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                            name="fullName"
                            value={currentUser.fullName}
                            sx={{ color: 'black' }}
                            required
                            inputProps={{ maxLength: 30 }}
                        />

                        <InputLabel htmlFor="email">
                            <FormattedMessage id="Email" />
                        </InputLabel>
                        <TextField
                            id="email"
                            type="email"
                            name="email"
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                            sx={{ color: 'black' }}
                            value={currentUser.email}
                            inputProps={{ maxLength: 50 }}
                        />
                    </Box>
                    <Box
                        sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: 'auto', width: '50%' }}
                    >
                        <InputLabel htmlFor="role">
                            <FormattedMessage id="Role" />
                        </InputLabel>
                        <Select
                            id="role"
                            type="select"
                            name="role"
                            required
                            value={String(currentUser.role)}
                            onChange={(e: SelectChangeEvent) => handleChange(e)}
                        >
                            <MenuItem value={0}>
                                <FormattedMessage id="User" />
                            </MenuItem>
                            <MenuItem value={1}>
                                <FormattedMessage id="Admin" />
                            </MenuItem>
                        </Select>
                        <InputLabel htmlFor="access">
                            <FormattedMessage id="Access" />
                        </InputLabel>
                        <Select
                            id="access"
                            name="access"
                            value={String(currentUser.access ? 1 : 0)}
                            onChange={(e: SelectChangeEvent) => handleChange(e)}
                            required
                        >
                            <MenuItem value={0}>
                                <FormattedMessage id="Blocked" />
                            </MenuItem>
                            <MenuItem value={1}>
                                <FormattedMessage id="Active" />
                            </MenuItem>
                        </Select>
                        <InputLabel htmlFor="newPassword">
                            <FormattedMessage id="New_password" />
                        </InputLabel>
                        <TextField
                            id="newPassword"
                            type="text"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                            name="newPassword"
                            value={currentUser.password}
                            sx={{ color: 'black' }}
                            inputProps={{
                                maxLength: 20,
                                minLength: 6,
                                pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$',
                                title: 'Password must contain at least one letter and one number'
                            }}
                        />
                    </Box>
                </Box>
            </Card>
            <AdminPanelButtons currentUser={currentUser} setCurrentUser={setCurrentUserHandler} user={user} />
        </Card>
    );
}
export default AdminPanel;
