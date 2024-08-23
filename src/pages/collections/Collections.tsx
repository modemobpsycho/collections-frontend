import { useEffect, useState } from 'react';
import { useGetCollectionsQuery } from '@/stores/api/collections.api';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { ICollection } from '@/types/collection.interface';
import CollectionCard from '@/components/collectionCard/CollectionCard';
import { FormattedMessage } from 'react-intl';
import { variables } from '@/helpers/variables';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function Collections() {
    const [collectionsLimit, setCollectionsLimit] = useState(variables.COLLECTIONS_MIN);
    const { isLoading, data } = useGetCollectionsQuery(collectionsLimit);

    useEffect(() => {}, [isLoading]);

    return (
        <Box>
            {data && data.length > 0 ? (
                <Box>
                    <Typography variant="h4" sx={{ textAlign: 'center', margin: '20px' }}>
                        <FormattedMessage id="All_collections" />
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            margin: '10px 10px',
                            gap: '10px'
                        }}
                    >
                        {data &&
                            data.map((collection: ICollection) => (
                                <CollectionCard key={collection.id} collection={collection} />
                            ))}
                    </Box>
                </Box>
            ) : (
                <Typography variant="h4" sx={{ textAlign: 'center', margin: '20px' }}>
                    {isLoading ? <CircularProgress /> : <FormattedMessage id="All_collections_empty" />}
                </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                {data && collectionsLimit <= data.length && (
                    <Button
                        variant="outlined"
                        sx={{ marginTop: '20px', marginBottom: '20px' }}
                        onClick={() => setCollectionsLimit(collectionsLimit + variables.COLLECTIONS_INC)}
                    >
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <ExpandMoreIcon color="primary" sx={{ fontSize: '40px' }} />
                        )}
                    </Button>
                )}
                {data && collectionsLimit > variables.COLLECTIONS_MIN && (
                    <Button
                        variant="outlined"
                        sx={{ marginTop: '20px', marginBottom: '20px' }}
                        onClick={() => setCollectionsLimit(variables.COLLECTIONS_MIN)}
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

export default Collections;
