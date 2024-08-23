import { Box, Card, CircularProgress, Typography } from '@mui/material';
import { useGetBiggestCollectionsQuery } from '@/stores/api/collections.api';
import CollectionCard from '@/components/collectionCard/CollectionCard';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import { useGetLastTagsQuery } from '@/stores/api/tags.api';
import { useNavigate } from 'react-router-dom';
import LastItems from './LastItems';

const HomePage = () => {
    const navigate = useNavigate();
    const [tagsLimit, setTagsLimit] = useState(15);
    const { data: collections, isLoading: isLoadingCollections } = useGetBiggestCollectionsQuery();
    const { data: tags } = useGetLastTagsQuery(tagsLimit);

    return (
        <Box sx={{ padding: '20px' }}>
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
            <LastItems />
            {tags && tags.length > 0 && (
                <>
                    <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '10px' }}>
                        <FormattedMessage id="Last_tags" />
                    </Typography>
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '20px',
                                marginTop: '20px'
                            }}
                        >
                            {tags &&
                                tags.map((tag) => (
                                    <>
                                        <Card
                                            key={tag.id}
                                            onClick={() => navigate(`/search/${tag.tag}`)}
                                            sx={{
                                                padding: '5px',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                cursor: 'pointer',
                                                overflow: 'hidden',
                                                backgroundColor: 'black',
                                                color: 'white'
                                            }}
                                        >
                                            <Typography variant="h6">{tag.tag}</Typography>
                                        </Card>
                                    </>
                                ))}
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default HomePage;
