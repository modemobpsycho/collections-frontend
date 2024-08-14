import { useEffect } from 'react';
import { useGetCollectionsQuery } from '@/stores/api/collections.api';
import { Box, Typography } from '@mui/material';
import { ICollection } from '@/types/collection.interface';
import CollectionCard from '@/components/collectionCard/CollectionCard';

function Collections() {
    const { isLoading, data } = useGetCollectionsQuery();

    useEffect(() => {}, [isLoading]);

    return (
        <Box>
            <Typography variant="h4" sx={{ textAlign: 'center', margin: '20px' }}>
                COLLECTIONS
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', margin: '10px 10px', gap: '10px' }}>
                {data &&
                    data.map((collection: ICollection) => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))}
            </Box>
        </Box>
    );
}

export default Collections;
