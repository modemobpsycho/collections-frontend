import { IItemWithFields } from '@/types/item.interface';
import { Box, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CollectionItems({ items }: { items: IItemWithFields[] | undefined }) {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                flexDirection: 'column',
                gap: '10px',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)'
            }}
        >
            {items &&
                items.map((item) => (
                    <Card
                        key={item.id}
                        sx={{
                            cursor: 'pointer',
                            padding: '10px',
                            borderRadius: '10px'
                        }}
                        onClick={() => {
                            navigate(`/item/${item.id}`);
                        }}
                    >
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant="h5" noWrap component="div" sx={{ marginBottom: '10px' }}>
                                {item.name}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{ marginLeft: 'auto', marginTop: '10px' }}
                            >
                                {new Date(item.creationDate).toLocaleDateString()}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: '10px'
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                                {item.tags &&
                                    item.tags.map((tag) => (
                                        <Box
                                            key={tag.id}
                                            sx={{
                                                backgroundColor: 'cyan',
                                                color: 'black',
                                                padding: '3px',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                width: 'fit-content',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <Typography variant="body1">{tag.tag}</Typography>
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                    </Card>
                ))}
        </Box>
    );
}

export default CollectionItems;
