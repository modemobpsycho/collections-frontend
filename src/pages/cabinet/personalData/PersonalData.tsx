import { Box, Button, Card, CircularProgress, InputLabel, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useGetUserQuery, useUpdateUserMutation } from '@/stores/api/user.api';
import { useActions } from '@/hooks/useActions';

import './PersonalData.scss';

function PersonalData() {
    const { setUser, showSnackbar } = useActions();
    const [updateUser, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, data: dataUpdate, error, isError }] =
        useUpdateUserMutation();

    const { data: dataUser, isLoading: isLoadingUser, isSuccess: isSuccessUser } = useGetUserQuery();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        oldPassword: '',
        newPassword: ''
    });

    useEffect(() => {
        if (isSuccessUser) {
            setFormData({
                fullName: dataUser.fullName,
                email: dataUser.email,
                oldPassword: '',
                newPassword: ''
            });
        }
    }, [isLoadingUser]);

    useEffect(() => {
        if (isSuccessUpdate) {
            setUser(dataUpdate);
            showSnackbar('Profile_updated_successfully');
        }
        if (isError) {
            let errorMessage = (error as any).data.message.replace(/ /g, '_');
            showSnackbar(errorMessage);
        }
    }, [isLoadingUpdate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await updateUser(formData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card
            className="card"
            sx={{
                backgroundColor: 'secondary.dark'
            }}
        >
            {isLoadingUser ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
                >
                    <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '20px' }}>
                        <FormattedMessage id="Your_personal_data" />
                    </Typography>
                    <InputLabel sx={{ marginTop: '20px' }}>
                        <FormattedMessage id="Name" />
                    </InputLabel>
                    <TextField
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        inputProps={{ maxLength: 30 }}
                    />
                    <InputLabel>
                        <FormattedMessage id="Email" />
                    </InputLabel>
                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        inputProps={{ maxLength: 50 }}
                    />
                    <InputLabel>
                        <FormattedMessage id="Old_password" />
                    </InputLabel>
                    <TextField
                        id="oldPassword"
                        name="oldPassword"
                        type="password"
                        required
                        value={formData.oldPassword}
                        onChange={handleChange}
                        inputProps={{
                            maxLength: 20,
                            minLength: 6,
                            pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$',
                            title: 'Password must contain at least one letter and one number'
                        }}
                    />
                    <InputLabel>
                        <FormattedMessage id="New_password" />
                    </InputLabel>
                    <TextField
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        inputProps={{
                            maxLength: 20,
                            minLength: 6,
                            pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$',
                            title: 'Password must contain at least one letter and one number'
                        }}
                    />
                    <Button variant="contained" type="submit" sx={{ marginTop: '20px' }} disabled={isLoadingUpdate}>
                        {isLoadingUpdate ? <CircularProgress size={25} /> : <FormattedMessage id="Save" />}
                    </Button>
                </Box>
            )}
        </Card>
    );
}

export default PersonalData;
