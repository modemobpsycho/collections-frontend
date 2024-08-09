import { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';

import './authPage.scss';
import { FormattedMessage } from 'react-intl';

function AuthWrapper({ children }: { children: ReactElement[] | ReactElement }) {
    return (
        <Box className={'auth-page'}>
            <Typography
                variant="h4"
                sx={{
                    marginTop: '20px',
                    textAlign: 'center',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '70%'
                }}
            >
                <FormattedMessage id="auth_welcome" />
            </Typography>
            {children}
        </Box>
    );
}

export default AuthWrapper;
