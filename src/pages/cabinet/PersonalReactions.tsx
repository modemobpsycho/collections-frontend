import { useGetUserReactionsQuery } from '@/stores/api/reaction.api';
import { Box, Button, Card, CircularProgress, IconButton, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useNavigate } from 'react-router-dom';
import { variables } from '@/helpers/variables';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function PersonalReactions() {
    const navigate = useNavigate();
    const [reactionsLimit, setReactionsLimit] = useState(variables.COMMENTS_REACTIONS_MIN);
    const { data: reactions, isLoading: isLoadingReactions } = useGetUserReactionsQuery(reactionsLimit);

    const handleLoadMore = () => {
        if (reactionsLimit + variables.COMMENTS_REACTIONS_INC <= variables.COMMENTS_REACTIONS_MAX) {
            setReactionsLimit(reactionsLimit + variables.COMMENTS_REACTIONS_INC);
        }
    };

    const handleResetItems = () => {
        setReactionsLimit(variables.COMMENTS_REACTIONS_MIN);
    };

    return (
        <Card
            sx={{
                display: 'grid',
                width: '30%',
                padding: '10px',
                borderRadius: '10px',
                margin: 'auto',
                marginTop: '20px',
                backgroundColor: 'secondary.dark'
            }}
        >
            {isLoadingReactions ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {reactions?.map((reaction) => (
                        <Card
                            key={reaction.id}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                padding: '10px',
                                width: '100%',
                                borderRadius: '10px'
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                <Box
                                    sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginRight: 'auto' }}
                                >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                                        <FormattedMessage id="Item" />
                                    </Typography>
                                    <Typography sx={{ wordWrap: 'break-word', overflow: 'hidden', maxWidth: '350px' }}>
                                        {reaction.item.name}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <Box sx={{ display: 'flex', gap: '10px', alignSelf: 'flex-end' }}>
                                        {reaction.isLike ? (
                                            <FavoriteIcon color="error" />
                                        ) : (
                                            <ThumbDownIcon color="primary" />
                                        )}
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            navigate(`/item/${reaction.item.id}`);
                                        }}
                                        sx={{ alignSelf: 'flex-end', marginTop: 'auto' }}
                                    >
                                        <FormattedMessage id="Go_to_item" />
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    ))}
                </Box>
            )}

            {reactions && reactionsLimit <= reactions.length && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {reactionsLimit < variables.COMMENTS_REACTIONS_MAX && (
                        <IconButton sx={{ marginTop: '20px' }} onClick={handleLoadMore}>
                            <ExpandMoreIcon color="primary" sx={{ fontSize: '40px' }} />
                        </IconButton>
                    )}
                    {reactionsLimit > variables.COMMENTS_REACTIONS_MIN && (
                        <IconButton sx={{ marginTop: '20px' }} onClick={handleResetItems}>
                            <ExpandLessIcon color="primary" sx={{ fontSize: '40px' }} />
                        </IconButton>
                    )}
                </Box>
            )}

            {reactions && reactions.length === 0 && (
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    {isLoadingReactions ? (
                        <CircularProgress />
                    ) : (
                        <FormattedMessage id="You_have_not_left_likes_and_dislikes_yet" />
                    )}
                </Typography>
            )}
        </Card>
    );
}

export default PersonalReactions;
