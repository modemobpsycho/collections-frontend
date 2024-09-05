import { useGetLastTagsQuery } from '@/stores/api/tags.api';
import { Box, Card, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { variables } from '@/helpers/variables';

function LastTags() {
    const navigate = useNavigate();
    const { data: tags } = useGetLastTagsQuery(variables.TAGS_MIN);
    return (
        <Box className="last-tags-wrapper">
            {tags && tags.length > 0 && (
                <>
                    <Typography className="last-tags-wrapper-title" sx={{ marginBottom: '20px' }}>
                        <FormattedMessage id="Last_tags" />
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Box className="last-tags-wrapper-tags">
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
