import { useState } from 'react';
import { useGetLastTagsQuery } from '@/stores/api/tags.api';
import { Box, Card, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

function LastTags() {
    const navigate = useNavigate();
    const [tagsLimit, setTagsLimit] = useState(15);
    const { data: tags } = useGetLastTagsQuery(tagsLimit);
    return (
        <Box>
            {tags && tags.length > 0 && (
                <>
                    <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '40px' }}>
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
                                ))}
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default LastTags;
