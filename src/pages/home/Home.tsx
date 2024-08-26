import { Box } from '@mui/material';
import LastItems from './LastItems';
import LastTags from './LastTags';
import BiggestCollections from './BiggestCollections';

import './Home.scss';

const HomePage = () => {
    return (
        <Box className="home-wrapper">
            <BiggestCollections />
            <LastItems />
            <LastTags />
        </Box>
    );
};

export default HomePage;
