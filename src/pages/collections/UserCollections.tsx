import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, CircularProgress, Link, Typography } from '@mui/material';
import CollectionCard from '@/components/collectionCard/CollectionCard';
import { useGetMyCollectionsQuery } from '@/stores/api/collections.api';
import { useEffect, useState } from 'react';
import { ICollection } from '@/types/collection.interface';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { FormattedMessage } from 'react-intl';
import { variables } from '@/helpers/variables';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function UserCollections() {
    const [collectionsLimit, setCollectionsLimit] = useState(variables.USER_COLLECTIONS_MIN);
    const { isLoading, data } = useGetMyCollectionsQuery(collectionsLimit);

    useEffect(() => {}, [isLoading]);

    return (
        <Box
            sx={{
                width: '50vw',
                maxWidth: '50vw',
                margin: '20px auto'
            }}
        >
            {data && data?.length > 0 ? (
                <>
                    <Typography variant="h4" sx={{ textAlign: 'center', margin: '20px' }}>
                        <FormattedMessage id="My_collections" />
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(1, 1fr)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%'
                        }}
                    >
                        {data &&
                            data.map((collection: ICollection) => (
                                <CollectionCard key={collection.id} collection={collection} />
                            ))}
                    </Box>
                </>
            ) : (
                <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '20px' }}>
                    {isLoading ? <CircularProgress /> : <FormattedMessage id="No_user_collections" />}
                </Typography>
            )}
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
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                {data && collectionsLimit <= data.length && (
                    <Button
                        variant="outlined"
                        sx={{ marginTop: '20px', marginBottom: '20px' }}
                        onClick={() => setCollectionsLimit(collectionsLimit + variables.USER_COLLECTIONS_INC)}
                    >
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <ExpandMoreIcon color="primary" sx={{ fontSize: '40px' }} />
                        )}
                    </Button>
                )}
                {data && collectionsLimit > variables.USER_COLLECTIONS_MIN && (
                    <Button
                        variant="outlined"
                        sx={{ marginTop: '20px', marginBottom: '20px' }}
                        onClick={() => setCollectionsLimit(variables.USER_COLLECTIONS_MIN)}
                    >
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <ExpandLessIcon color="primary" sx={{ fontSize: '40px' }} />
                        )}
                    </Button>
                )}
            </Box>
        </Box>
    );
}

export default UserCollections;
