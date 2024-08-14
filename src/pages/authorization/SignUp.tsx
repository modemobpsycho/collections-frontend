import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignupUserMutation } from '@/stores/api/user.api';
import { FormattedMessage } from 'react-intl';

function SignUp() {
    const [signupUser, { isLoading }] = useSignupUserMutation();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await signupUser(formData);
            setFormData({
                fullName: '',
                email: '',
                password: ''
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <Container maxWidth="sm">
                <Box component="form" className="form-box">
                    <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                        <FormattedMessage id="Sign_up" />
                    </Typography>

                    <TextField
                        label={<FormattedMessage id="Full_Name" />}
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />

                    <TextField
                        label={<FormattedMessage id="Email" />}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
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
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={25} /> : <FormattedMessage id="Sign_up_button" />}
                    </Button>
                    <Typography variant="body1" className="new-to-collections">
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
