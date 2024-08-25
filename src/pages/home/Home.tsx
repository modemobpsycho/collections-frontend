import { Box } from '@mui/material';
import LastItems from './LastItems';
import LastTags from './LastTags';
import BiggestCollections from './BiggestCollections';

const HomePage = () => {
    return (
        <Box sx={{ padding: '20px' }}>
            <BiggestCollections />
            <LastItems />
            <LastTags />
        </Box>
    );
};

export default HomePage;
