import { Box, Typography } from '@mui/material';
import { useGetBiggestCollectionsQuery } from '@/stores/api/collections.api';
import CollectionCard from '@/components/collectionCard/CollectionCard';
import { FormattedMessage } from 'react-intl';

const HomePage = () => {
    const { isLoading: isLoadingCollections, data: collections } = useGetBiggestCollectionsQuery();
    return (
        <Box sx={{ padding: '20px' }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3">
                    <FormattedMessage id="Welcome_to_Our_Collections" />
                </Typography>
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                    <FormattedMessage id="Here_our_biggest_collections" />
                </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', justifyContent: 'center', gap: '20px' }}>
                {collections &&
                    collections.map((collection) => <CollectionCard key={collection.id} collection={collection} />)}
            </Box>
        </Box>
    );
};

export default HomePage;
