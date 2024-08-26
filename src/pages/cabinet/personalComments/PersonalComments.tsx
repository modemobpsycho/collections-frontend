import { variables } from '@/helpers/variables';
import { useGetUserCommentsQuery } from '@/stores/api/comments.api';
import { Box, Button, Card, CircularProgress, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function PersonalComments() {
    const navigate = useNavigate();
    const [commentsLimit, setCommentsLimit] = useState(variables.COMMENTS_REACTIONS_MIN);
    const { data: comments, isLoading } = useGetUserCommentsQuery(commentsLimit);

    const handleLoadMore = () => {
        if (commentsLimit + variables.COMMENTS_REACTIONS_INC <= variables.COMMENTS_REACTIONS_MAX) {
            setCommentsLimit(commentsLimit + variables.COMMENTS_REACTIONS_INC);
        }
    };

    const handleResetItems = () => {
        setCommentsLimit(variables.COMMENTS_REACTIONS_MIN);
    };

    useEffect(() => {}, [isLoading]);

    return (
        <Card
            className="card"
            sx={{
                backgroundColor: 'secondary.dark'
            }}
        >
            {!isLoading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {comments &&
                        comments.map((comment) => (
                            <Card
                                key={comment.id}
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
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px',
                                            marginRight: 'auto',
                                            width: '100%'
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                                            <FormattedMessage id="Comment" />
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '15px',
                                                maxWidth: '650px',
                                                wordWrap: 'break-word'
                                            }}
                                        >
                                            {comment.textComment}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '20%' }}>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ display: 'flex', gap: '10px', alignSelf: 'flex-end' }}
                                        >
                                            {new Date(comment.creationDate).toLocaleTimeString().slice(0, 5)}{' '}
                                            {new Date(comment.creationDate).toLocaleDateString()}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                navigate(`/item/${comment.item.id}`);
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
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )}

            {comments && commentsLimit <= comments.length && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {commentsLimit < variables.COMMENTS_REACTIONS_MAX && (
                        <IconButton sx={{ marginTop: '20px' }} onClick={handleLoadMore}>
                            <ExpandMoreIcon color="primary" sx={{ fontSize: '40px' }} />
                        </IconButton>
                    )}
                    {commentsLimit > variables.COMMENTS_REACTIONS_MIN && (
                        <IconButton sx={{ marginTop: '20px' }} onClick={handleResetItems}>
                            <ExpandLessIcon color="primary" sx={{ fontSize: '40px' }} />
                        </IconButton>
                    )}
                </Box>
            )}

            {comments && comments.length === 0 && (
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <FormattedMessage id="So_far_you_have_not_commented_on_anything" />
                    )}
                </Typography>
            )}
        </Card>
    );
}

export default PersonalComments;
