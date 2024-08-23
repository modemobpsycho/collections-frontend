import { Button, Card, CircularProgress, InputLabel, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useGetUserQuery, useUpdateUserMutation } from '../../stores/api/user.api';
import { useActions } from '../../hooks/useActions';

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

    const handleSubmit = async () => {
        try {
            await updateUser(formData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
                padding: '10px',
                borderRadius: '10px',
                margin: 'auto',
                marginTop: '10px',
                gap: '10px',
                backgroundColor: 'secondary.dark'
            }}
        >
            <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '20px' }}>
                <FormattedMessage id="Your_personal_data" />
            </Typography>
            <InputLabel sx={{ marginTop: '20px' }}>
                <FormattedMessage id="Name" />
            </InputLabel>
            <TextField id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
            <InputLabel>
                <FormattedMessage id="Email" />
            </InputLabel>
            <TextField id="email" name="email" value={formData.email} onChange={handleChange} />
            <InputLabel>
                <FormattedMessage id="Old_password" />
            </InputLabel>
            <TextField id="oldPassword" name="oldPassword" value={formData.oldPassword} onChange={handleChange} />
            <InputLabel>
                <FormattedMessage id="New_password" />
            </InputLabel>
            <TextField id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} />
            <Button variant="contained" sx={{ marginTop: '20px' }} onClick={handleSubmit}>
                {isLoadingUpdate ? <CircularProgress size={25} /> : <FormattedMessage id="Save" />}
            </Button>
        </Card>
    );
}

export default PersonalData;
