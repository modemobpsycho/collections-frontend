import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Link } from '@mui/material';
import CollectionCard from '../../components/CollectionCard/CollectionCard';

function UserCollections() {
    return (
        <Box>
            <Link component={RouterLink} to="/add-collection">
                <Button variant="contained" color="primary" sx={{ margin: '10px' }}>
                    Add collection
                </Button>
            </Link>
            {/* {collections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
            ))} */}
        </Box>
    );
}

export default UserCollections;
