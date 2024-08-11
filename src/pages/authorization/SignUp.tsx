import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignupUserMutation } from '../../stores/api/user.api';
import { FormattedMessage } from 'react-intl';

function SignUp() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const [signupUser, { isLoading }] = useSignupUserMutation();

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
                        <FormattedMessage id="signup" />
                    </Typography>

                    <TextField
                        label={<FormattedMessage id="fullName" />}
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />

                    <TextField
                        label={<FormattedMessage id="email" />}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />

                    <TextField
                        type="password"
                        label={<FormattedMessage id="password" />}
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
                        {isLoading ? <CircularProgress size={25} /> : <FormattedMessage id="button_signup" />}
                    </Button>
                    <Typography variant="body1" className="new-to-collections">
                        <FormattedMessage id="rem_signup" />
                        <Typography component={Link} to="/login" sx={{ textDecoration: 'none', marginLeft: '5px' }}>
                            <FormattedMessage id="button_login" />
                        </Typography>
                    </Typography>
                </Box>
            </Container>
        </div>
    );
}

export default SignUp;
