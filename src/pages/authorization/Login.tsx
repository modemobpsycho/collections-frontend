import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../stores/api/user.api';
import { useActions } from '../../hooks/useActions';
import { IUser } from '../../types/user.interface';
import { FormattedMessage } from 'react-intl';

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { setUser } = useActions();
    const [loginUser, { isLoading, isSuccess, data }] = useLoginUserMutation();

    useEffect(() => {
        if (isSuccess) {
            setUser(data as IUser);
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <FormattedMessage id="login" />
                </Typography>

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
                    disabled={isLoading}
                    onClick={handleSubmit}
                >
                    {isLoading ? (
                        <CircularProgress size={25} />
                    ) : (
                        <FormattedMessage id="button_login" />
                    )}
                </Button>

                <Typography variant="body1" className="new-to-collections">
                    <FormattedMessage id="rem_login" />
                    <Typography component={Link} to="/signup">
                        <FormattedMessage id="join_now" />
                    </Typography>
                </Typography>
            </Box>
        </Container>
    );
}

export default Login;
