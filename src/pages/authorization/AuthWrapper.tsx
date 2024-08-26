import { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import './authPage.scss';

function AuthWrapper({ children }: { children: ReactElement[] | ReactElement }) {
    return (
        <Box className={'auth-page'}>
            <Typography className={'header'}>
                <FormattedMessage id="Welcome_to_the_creative_and_entertainment_platform" />
            </Typography>
            {children}
        </Box>
    );
}

export default AuthWrapper;
