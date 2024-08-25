import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '@/stores/api/user.api';
import { useActions } from '@/hooks/useActions';
import { FormattedMessage } from 'react-intl';
import { baseApi } from '@/stores/api/baseApi';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { useGetUserInfoGoogleQuery, useLoginUserGoogleMutation } from '@/stores/api/google.api';
import GithubLogin from '@/components/githubLogin/GithubLogin';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setUser, showSnackbar } = useActions();
    const [accessToken, setAccessToken] = useState('');
    const [loginUser, { isLoading, isSuccess, data, isError, error }] = useLoginUserMutation();
    const [
        loginUserGoogle,
        { isLoading: isLoadingGoogle, isSuccess: isSuccessGoogle, data: dataGoogle, isError: isErrorGoogle }
    ] = useLoginUserGoogleMutation();
    const { data: userInfoGoogle } = useGetUserInfoGoogleQuery(accessToken as any, { skip: !accessToken });

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (isSuccess) {
            setUser(data);
            dispatch(baseApi.util.invalidateTags(['User', 'Users', 'Items', 'Collections']));
            navigate('/');
            showSnackbar('Log_in_success');
        }
        if (isError) {
            let errorMessage = (error as any).data.message.replace(/ /g, '_');
            if ('status' in error) {
                if (error.status === 401) {
                    errorMessage = 'Invalid_email_or_password';
                } else if (error.status === 403) {
                    errorMessage = 'User_account_is_blocked';
                } else {
                    errorMessage = errorMessage.replace(/ /g, '_');
                }
            }
            showSnackbar(errorMessage);
        }
    }, [isLoading]);

    useEffect(() => {
        if (isSuccessGoogle) {
            setUser(dataGoogle);
            dispatch(baseApi.util.invalidateTags(['User', 'Users', 'Items', 'Collections']));
            showSnackbar('Log_in_success_with_google');
            navigate('/');
        }

        if (isErrorGoogle) {
            showSnackbar((error as any).data.message);
        }
    }, [isLoadingGoogle]);

    useEffect(() => {
        if (accessToken) {
            const fetchUserInfo = async () => {
                try {
                    await useGetUserInfoGoogleQuery(accessToken as any);
                } catch (error) {
                    console.log('Error fetching user info from Google API:', error);
                }
            };
            fetchUserInfo();
        }
    }, [accessToken]);

    useEffect(() => {
        if (userInfoGoogle) {
            handleGoogleLogin();
        }
    }, [userInfoGoogle]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
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

    const handleGoogleLogin = async () => {
        try {
            await loginUserGoogle({
                userInfo: userInfoGoogle
            });
        } catch (error) {
            console.log(error);
        }
    };

    const loginGoogle = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            setAccessToken(credentialResponse.access_token);
        }
    });

    return (
        <Container maxWidth="sm" className="container">
            <Box component="form" className="form-box" autoComplete="on" onSubmit={handleSubmit}>
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                    <FormattedMessage id="Login" />
                </Typography>
                <TextField
                    label={<FormattedMessage id="Email" />}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
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
                        minLength: 6
                    }}
                />
                <Button type="submit" variant="contained" color="primary" className="button" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={25} /> : <FormattedMessage id="Log_in_button" />}
                </Button>
                <Typography variant="body1" className="new-to-collections">
                    <FormattedMessage id="Dont_have_an_account" />
                    <Typography component={Link} to="/signup">
                        <FormattedMessage id="Join_now" />
                    </Typography>
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '15px'
                    }}
                >
                    <hr className="line" style={{ width: '100%' }} />
                    <Typography variant="body1" sx={{ mx: 1, my: 1, width: '50%', textAlign: 'center' }}>
                        <FormattedMessage id="Or_sign_in_with" />
                    </Typography>
                    <hr className="line" style={{ width: '100%' }} />
                </Box>
                <Button
                    onClick={() => loginGoogle()}
                    variant="outlined"
                    color="primary"
                    sx={{
                        textAlign: 'center',
                        textTransform: 'none',
                        borderRadius: '20px',
                        fontSize: '16px'
                    }}
                >
                    <img
                        src="https://img.icons8.com/color/48/000000/google-logo.png"
                        style={{ marginRight: '10px', width: '30px', marginLeft: '-10px' }}
                        alt="Google"
                    />
                    <FormattedMessage id="Log_in_with_Google" />
                </Button>
                <GithubLogin />
            </Box>
        </Container>
    );
}

export default Login;
