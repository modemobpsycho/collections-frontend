import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetBiggestCollectionsQuery } from '@/stores/api/collections.api';
import { FormattedMessage } from 'react-intl';
import CollectionCard from '@/components/collectionCard/CollectionCard';

function BiggestCollections() {
    const { data: collections, isLoading: isLoadingCollections } = useGetBiggestCollectionsQuery();

    return (
        <Box className="biggest-wrapper">
            <Box>
                <Typography className="typography-wrapper-welcome">
                    <FormattedMessage id="Welcome_to_Our_Collections" />
                </Typography>
            </Box>
            {collections && collections.length > 0 ? (
                <>
                    <Typography className="biggest-title">
                        <FormattedMessage id="Here_our_biggest_collections" />
                    </Typography>
                    <Box className="biggest-collections">
                        {collections &&
                            collections.map((collection) => (
                                <CollectionCard key={collection.id} collection={collection} />
                            ))}
                    </Box>
                </>
            ) : (
                <Typography className="biggest-title">
                    {isLoadingCollections ? <CircularProgress /> : <FormattedMessage id="Collections_empty" />}
                </Typography>
            )}
        </Box>
    );
}

export default BiggestCollections;
