import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '@/stores/api/user.api';
import { useActions } from '@/hooks/useActions';
import { FormattedMessage } from 'react-intl';
import { baseApi } from '@/stores/api/baseApi';
import { useDispatch } from 'react-redux';

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { setUser } = useActions();
    const [loginUser, { isLoading, isSuccess, data }] = useLoginUserMutation();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (isSuccess) {
            setUser(data);
            dispatch(baseApi.util.invalidateTags(['User', 'Users', 'Items', 'Collections']));
            navigate('/');
        }
    }, [isLoading]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await loginUser(formData);

            setFormData({
                email: '',
                password: ''
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container maxWidth="sm" className="container">
            <Box component="form" className="form-box">
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                    <FormattedMessage id="Login" />
                </Typography>

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
                    disabled={isLoading}
                    onClick={handleSubmit}
                >
                    {isLoading ? <CircularProgress size={25} /> : <FormattedMessage id="Log_in_button" />}
                </Button>

                <Typography variant="body1" className="new-to-collections">
                    <FormattedMessage id="Dont_have_an_account" />
                    <Typography component={Link} to="/signup">
                        <FormattedMessage id="Join_now" />
                    </Typography>
                </Typography>
            </Box>
        </Container>
    );
}

export default Login;
