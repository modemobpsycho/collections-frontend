import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Link, Typography } from '@mui/material';
import CollectionCard from '@/components/collectionCard/CollectionCard';
import { useGetMyCollectionsQuery } from '@/stores/api/collections.api';
import { useEffect } from 'react';
import { ICollection } from '@/types/collection.interface';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

function UserCollections() {
    const { isLoading, data } = useGetMyCollectionsQuery();

    useEffect(() => {}, [isLoading]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                margin: '20px auto',
                alignItems: 'center',
                width: '50%',
                gap: '10px'
            }}
        >
            <Typography variant="h4">MY COLLECTIONS</Typography>

            {data &&
                data.map((collection: ICollection) => <CollectionCard key={collection.id} collection={collection} />)}
            <Link
                component={RouterLink}
                to="/add-collection"
                sx={{ position: 'fixed', right: 'calc(20% + 10px)', bottom: '10px' }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        borderRadius: '50%',
                        height: '70px',
                        width: '70px',
                        padding: '20px',
                        minWidth: 'unset'
                    }}
                >
                    <LibraryAddIcon fontSize="large" />
                </Button>
            </Link>
        </Box>
    );
}

export default UserCollections;
