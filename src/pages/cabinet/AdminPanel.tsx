import { Box, Card, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import AdminPanelUsers from './AdminPanelUsers';
import AdminPanelButtons from './AdminPanelButtons';
import { useGetAllUsersQuery } from '@/stores/api/user.api';
import { useEffect, useState } from 'react';
import { IUser } from '@/types/user.interface';
import { FormattedMessage } from 'react-intl';

function AdminPanel() {
    const { isLoading, data } = useGetAllUsersQuery();
    const [currentUser, setCurrentUser] = useState({
        id: 0,
        email: '',
        fullName: '',
        role: 0,
        access: true,
        password: ''
    });

    useEffect(() => {}, [isLoading]);

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

    useEffect(() => {}, [isLoading]);
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
                gap: '10px',
                width: '40%',
                margin: 'auto',
                borderRadius: '10px',
                backgroundColor: 'backgroundCardDark'
            }}
        >
            <AdminPanelUsers data={data} setCurrentUser={setCurrentUserHandler} />
            <Card sx={{ padding: '10px' }}>
                <Typography variant="h6" sx={{ marginBottom: '10px', textAlign: 'center' }}>
                    <FormattedMessage id="Current_user_data" />
                </Typography>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '50%' }}>
                        <InputLabel htmlFor="id">
                            <FormattedMessage id="ID" />
                        </InputLabel>
                        <TextField id="id" sx={{ color: 'black' }} disabled value={currentUser.id}></TextField>

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
                        />

                        <InputLabel htmlFor="email">
                            <FormattedMessage id="Email" />
                        </InputLabel>
                        <TextField
                            id="email"
                            type="email"
                            name="email"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                            sx={{ color: 'black' }}
                            value={currentUser.email}
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
                        />
                    </Box>
                </Box>
            </Card>
            <AdminPanelButtons currentUser={currentUser} setCurrentUser={setCurrentUserHandler} />
        </Card>
    );
}
export default AdminPanel;
