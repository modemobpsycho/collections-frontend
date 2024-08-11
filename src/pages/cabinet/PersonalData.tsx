import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useGetUserQuery, useUpdateUserMutation } from '../../stores/api/user.api';
import { useActions } from '../../hooks/useActions';

function PersonalData() {
    const { setUser } = useActions();
    const [updateUser, { isLoading, isSuccess, data }] = useUpdateUserMutation();

    const {
        data: userData,
        isLoading: isLoadingUser,
        isSuccess: isSuccessUser
    } = useGetUserQuery();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        oldPassword: '',
        newPassword: ''
    });

    useEffect(() => {
        if (isSuccessUser) {
            setFormData({
                fullName: userData.fullName,
                email: userData.email,
                oldPassword: '',
                newPassword: ''
            });
        }
    }, [isLoadingUser]);

    useEffect(() => {
        if (isSuccess) {
            setUser(data);
        }
    }, [isLoading, isSuccess]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await updateUser(formData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
                padding: '10px',
                borderRadius: '10px',
                margin: 'auto',
                marginTop: 'auto',
                gap: '10px'
            }}
        >
            <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '20px' }}>
                <FormattedMessage id="your_data" />
            </Typography>
            <InputLabel sx={{ marginTop: '20px' }}>
                <FormattedMessage id="name" />
            </InputLabel>
            <TextField
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
            />
            <InputLabel>
                <FormattedMessage id="email" />
            </InputLabel>
            <TextField id="email" name="email" value={formData.email} onChange={handleChange} />
            <InputLabel>
                <FormattedMessage id="old_password" />
            </InputLabel>
            <TextField
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
            />
            <InputLabel>
                <FormattedMessage id="new_password" />
            </InputLabel>
            <TextField
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
            />
            <Button variant="contained" sx={{ marginTop: '20px' }} onClick={handleSubmit}>
                <FormattedMessage id="save" />
            </Button>
        </Box>
    );
}

export default PersonalData;
