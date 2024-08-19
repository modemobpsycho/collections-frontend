import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Link, Typography } from '@mui/material';
import CollectionCard from '@/components/collectionCard/CollectionCard';
import { useGetMyCollectionsQuery } from '@/stores/api/collections.api';
import { useEffect } from 'react';
import { ICollection } from '@/types/collection.interface';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { FormattedMessage } from 'react-intl';

function UserCollections() {
    const { isLoading, data } = useGetMyCollectionsQuery();

    useEffect(() => {}, [isLoading]);

    return (
        <Box
            sx={{
                width: '50vw',
                maxWidth: '50vw',
                margin: '20px auto'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%'
                }}
            >
                <Typography variant="h4">
                    <FormattedMessage id="My_collections" />
                </Typography>

                {data &&
                    data.map((collection: ICollection) => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))}
            </Box>
            <Link
                component={RouterLink}
                to="/add-collection"
                sx={{ position: 'fixed', left: 'calc(75% + 20px)', bottom: '10px' }}
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
