import { IItem } from '@/types/item.interface';
import { Box, Button, Card, CircularProgress, TextField, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useAddCommentMutation, useDeleteCommentMutation } from '@/stores/api/comments.api';
import { useEffect, useRef, useState } from 'react';
import { IUser } from '@/types/user.interface';
import { Socket } from 'socket.io-client';
import { useActions } from '@/hooks/useActions';

function ItemComments({ item, user, connection }: { item: IItem; user: IUser | undefined; connection: Socket }) {
    const { showSnackbar } = useActions();
    const [commentText, setCommentText] = useState('');
    const [addComment, { isLoading: isLoadingAdd }] = useAddCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const commentListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (commentListRef.current) {
            commentListRef.current.scrollTop = commentListRef.current.scrollHeight;
        }
    }, [item.comments]);

    const handleAddComment = () => {
        if (commentText.trim() === '') return;

        addComment({
            comment: {
                id: 0,
                textComment: commentText,
                creationDate: new Date(),
                userFullname: '',
                userId: user?.id
            },
            itemId: item.id
        });
        connection.emit('message', item.id);
        setCommentText('');
    };

    const handleDeleteComment = (commentId: number) => {
        deleteComment(commentId);
        showSnackbar('Comment_deleted_successfully');
        connection.emit('message', item.id);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
                <FormattedMessage id="Comments" />
            </Typography>

            <Box
                sx={{
                    borderRadius: '10px',
                    padding: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    width: '100%',
                    overflowY: 'auto',
                    maxHeight: '400px',
                    scrollbarColor: (theme) => `${theme.palette.secondary.light} ${theme.palette.secondary.dark}`
                }}
                ref={commentListRef}
            >
                {item.comments &&
                    item.comments?.map((comment) => (
                        <Card
                            key={comment.id}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '5px',
                                flexShrink: 0,
                                padding: '10px',
                                maxHeight: 'fit-content',
                                borderRadius: '10px'
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: '5px' }}>
                                <Box sx={{ display: 'flex', gap: '5px', width: '100%' }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 'bold',
                                            paddingRight: '10px',
                                            fontSize: '18px'
                                        }}
                                    >
                                        {comment.userFullname}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="text.secondary"
                                        sx={{
                                            fontSize: '12px',
                                            marginTop: '5px'
                                        }}
                                    >
                                        {new Date(comment.creationDate).toLocaleTimeString().slice(0, 5)}{' '}
                                        {new Date(comment.creationDate).toLocaleDateString()}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '5px',
                                            marginLeft: 'auto'
                                        }}
                                    >
                                        {(user?.id === comment.userId || user?.role === 1) && (
                                            <Box
                                                sx={{
                                                    height: 'fit-content',
                                                    width: 'fit-content',
                                                    padding: '0 5px',
                                                    cursor: 'pointer',
                                                    marginLeft: 'auto'
                                                }}
                                                onClick={() => handleDeleteComment(comment.id)}
                                            >
                                                <CloseIcon
                                                    sx={{
                                                        color: 'red',
                                                        cursor: 'pointer',
                                                        fontSize: '25px'
                                                    }}
                                                />
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                            <Typography
                                variant="body1"
                                width="100%"
                                sx={{ paddingRight: '5px', wordWrap: 'break-word' }}
                            >
                                {comment.textComment}
                            </Typography>
                        </Card>
                    ))}
            </Box>

            {user && (
                <Box sx={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <TextField
                        label={<FormattedMessage id="Comment" />}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        sx={{ width: '100%' }}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                        inputProps={{ maxLength: 300, minLength: 1, maxRows: 6 }}
                        multiline
                    />
                    <Button variant="contained" onClick={handleAddComment} disabled={isLoadingAdd || !commentText}>
                        {isLoadingAdd ? <CircularProgress size={20} /> : <SendIcon />}
                    </Button>
                </Box>
            )}
        </Box>
    );
}
export default ItemComments;
