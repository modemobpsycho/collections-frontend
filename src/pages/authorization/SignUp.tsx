import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignupUserMutation } from '@/stores/api/user.api';
import { FormattedMessage } from 'react-intl';
import { useActions } from '@/hooks/useActions';

function SignUp() {
    const [signupUser, { isLoading, isSuccess, isError, error }] = useSignupUserMutation();
    const { showSnackbar } = useActions();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (isSuccess) {
            showSnackbar('Sign_up_success');
            setFormData({
                fullName: '',
                email: '',
                password: ''
            });
        }
        if (isError) {
            showSnackbar((error as any).data?.message.replace(/ /g, '_'));
        }
    }, [isSuccess, isError]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await signupUser(formData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <Container>
                <Box component="form" className="form-box" onSubmit={handleSubmit}>
                    <Typography className="login-title">
                        <FormattedMessage id="Sign_up" />
                    </Typography>

                    <TextField
                        label={<FormattedMessage id="Full_Name" />}
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="input-field"
                        inputProps={{ maxLength: 30 }}
                    />

                    <TextField
                        label={<FormattedMessage id="Email" />}
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        autoComplete="email"
                        onChange={handleChange}
                        required
                        className="input-field"
                        inputProps={{ maxLength: 50 }}
                    />

                    <TextField
                        type="password"
                        label={<FormattedMessage id="Password" />}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="input-field"
                        inputProps={{
                            maxLength: 20,
                            minLength: 6,
                            pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$',
                            title: 'Password must contain at least one letter and one number'
                        }}
                    />

                    <Button type="submit" variant="contained" color="primary" className="button" disabled={isLoading}>
                        {isLoading ? <CircularProgress size={25} /> : <FormattedMessage id="Sign_up_button" />}
                    </Button>
                    <Typography className="new-to-collections">
                        <FormattedMessage id="Already_have_an_account" />
                        <Typography component={Link} to="/login" sx={{ textDecoration: 'none', marginLeft: '5px' }}>
                            <FormattedMessage id="Log_in_button" />
                        </Typography>
                    </Typography>
                </Box>
            </Container>
        </div>
    );
}

export default SignUp;
