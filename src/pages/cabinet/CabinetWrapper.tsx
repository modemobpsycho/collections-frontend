import { Box, Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import PersonalData from './PersonalData';

function Cabinet() {
    const navigate = useNavigate();

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    width: 'auto',
                    height: '85%',
                    marginLeft: '20px',
                    marginTop: '20px',
                    position: 'fixed'
                }}
            >
                <Button variant="contained" onClick={() => navigate('/')}>
                    <FormattedMessage id="go_to_home" />
                </Button>
                <Button variant="contained" onClick={() => navigate('/cabinet')}>
                    <FormattedMessage id="my_data" />
                </Button>
                <Button variant="contained" onClick={() => navigate('/my-collections')}>
                    <FormattedMessage id="my_collections" />
                </Button>
                <Button variant="contained">
                    <FormattedMessage id="my_comments" />
                </Button>
                <Button variant="contained">
                    <FormattedMessage id="my_reactions" />
                </Button>

                <Button variant="contained" sx={{ backgroundColor: 'red', marginTop: 'auto' }}>
                    <FormattedMessage id="del_acc" />
                </Button>
            </Box>
            <Box>
                <PersonalData />
            </Box>
        </Box>
    );
}

export default Cabinet;
