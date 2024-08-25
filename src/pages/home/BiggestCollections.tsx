import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetBiggestCollectionsQuery } from '@/stores/api/collections.api';
import { FormattedMessage } from 'react-intl';
import CollectionCard from '@/components/collectionCard/CollectionCard';

function BiggestCollections() {
    const { data: collections, isLoading: isLoadingCollections } = useGetBiggestCollectionsQuery();

    return (
        <Box>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3">
                    <FormattedMessage id="Welcome_to_Our_Collections" />
                </Typography>
            </Box>
            {collections && collections.length > 0 ? (
                <>
                    <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
                        <FormattedMessage id="Here_our_biggest_collections" />
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            justifyContent: 'center',
                            gap: '20px'
                        }}
                    >
                        {collections &&
                            collections.map((collection) => (
                                <CollectionCard key={collection.id} collection={collection} />
                            ))}
                    </Box>
                </>
            ) : (
                <Typography variant="h4" sx={{ textAlign: 'center', margin: '20px' }}>
                    {isLoadingCollections ? <CircularProgress /> : <FormattedMessage id="Collections_empty" />}
                </Typography>
            )}
        </Box>
    );
}

export default BiggestCollections;
