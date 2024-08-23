import {
    useAccessAuthGithubMutation,
    useGetCodeGithubMutation,
    useGetUserInfoGithubMutation,
    useLoginUserGithubMutation
} from '@/stores/api/github.api';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

function GithubLogin() {
    const navigate = useNavigate();
    const [codeState, setCodeState] = useState<string>('');
    const [accessToken, setAccessToken] = useState<string>('');
    const client_id = process.env.VITE_REACT_APP_GITHUB_CLIENT_ID;
    const redirect_uri = process.env.VITE_REACT_APP_GITHUB_REDIRECT_URI;
    const client_secret = process.env.VITE_REACT_APP_GITHUB_CLIENT_SECRET;
    const [getCodeGithub, { data: code }] = useGetCodeGithubMutation();
    const [accessAuthGithub] = useAccessAuthGithubMutation();
    const [getUserInfoGithub, { data: userInfo }] = useGetUserInfoGithubMutation();
    const [loginUserGithub, { isSuccess: loginUserGithubIsSuccess }] = useLoginUserGithubMutation();

    useEffect(() => {
        const url = window.location.href;
        const code = new URLSearchParams(window.location.search).get('code');
        const hasCode = url.includes('?code=');

        if (hasCode) {
            const newUrl = url.split('?code=');
            window.history.pushState({}, '', newUrl[0]);

            setCodeState(code || '');
        }
    }, []);

    useEffect(() => {
        if (codeState) {
            accessAuthGithub({ clientID: client_id, clientSecret: client_secret, requestToken: codeState });
        }
    }, [codeState, accessAuthGithub]);

    useEffect(() => {
        if (accessToken) {
            getUserInfoGithub({ accessToken });
        }
    }, [accessToken, getUserInfoGithub]);

    useEffect(() => {
        if (userInfo) {
            loginUserGithub({ userInfo: userInfo });
        }
    }, [userInfo, loginUserGithub]);

    useEffect(() => {
        if (loginUserGithubIsSuccess) {
            navigate('/');
        }
    }, [loginUserGithubIsSuccess, navigate]);

    const handleGithubLogin = () => {
        window.location.href = `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`;
    };

    return (
        <Button
            variant="outlined"
            sx={{
                textAlign: 'center',
                textTransform: 'none',
                borderRadius: '20px',
                fontSize: '16px',
                marginTop: '10px'
            }}
            onClick={handleGithubLogin}
            disabled
        >
            <GitHubIcon
                sx={{ marginRight: '10px', width: '30px', marginLeft: '-10px', fontSize: '27px', color: 'black' }}
            />
            <FormattedMessage id="Log_in_with_GitHub" />
        </Button>
    );
}

export default GithubLogin;
