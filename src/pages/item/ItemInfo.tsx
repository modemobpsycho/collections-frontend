import { variables } from '@/helpers/variables';
import { IItem } from '@/types/item.interface';
import { Box, IconButton, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useEffect, useState } from 'react';
import { useSetReactionMutation } from '@/stores/api/reaction.api';
import { useGetUserQuery } from '@/stores/api/user.api';
import { Socket } from 'socket.io-client';

function ItemInfo({ item, connection }: { item: IItem; connection: Socket }) {
    const { data: user } = useGetUserQuery();
    const [liked] = useState<boolean>(false);
    const [disliked] = useState<boolean>(false);
    const [setReaction] = useSetReactionMutation();

    const handleReaction = (isLike: boolean) => {
        setReaction({
            reaction: {
                id: 0,
                creationDate: new Date(),
                isLike: isLike,
                userId: 0
            },
            itemId: item.id
        });
        connection.emit('message', item.id);
    };

    useEffect(() => {}, [liked, disliked]);

    return (
        <Box sx={{ display: 'flex', gap: '10px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '50%' }}>
                <img
                    src={variables.BACKEND_URL + item?.collection?.photoPath}
                    alt="collection img"
                    style={{ borderRadius: '10px' }}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    margin: '0 auto'
                }}
            >
                <Typography variant="h4" component="div" noWrap sx={{ textAlign: 'center', maxWidth: '400px' }}>
                    {item.name}
                </Typography>
                <Typography variant="h6" color="text.primary" sx={{ marginBottom: '10px', marginTop: '10px' }}>
                    <FormattedMessage id="Collection" />
                    {': '}
                    {item.collection && item.collection.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ marginBottom: '10px', marginTop: '-5px' }}>
                    <FormattedMessage id="Creation_date" />
                    {': '}
                    {new Date(item.creationDate).toLocaleTimeString().slice(0, 5) +
                        ' ' +
                        new Date(item.creationDate).toLocaleDateString()}
                </Typography>
                <Box sx={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <IconButton
                        onClick={() => handleReaction(true)}
                        sx={{
                            cursor: 'pointer',
                            color: 'red',
                            '&:hover': {
                                backgroundColor: 'transparent'
                            },
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%'
                        }}
                    >
                        {item.likes?.filter((like) => like.isLike === true).some((like) => like.userId === user?.id) ? (
                            <FavoriteIcon color="error" sx={{ fontSize: '45px' }} />
                        ) : (
                            <FavoriteBorderIcon
                                sx={{ fontSize: '40px', color: (theme) => theme.palette.text.primary }}
                            />
                        )}
                    </IconButton>
                    <Typography variant="h5" sx={{ marginTop: '13px', marginLeft: '-10px' }}>
                        {item.likes?.filter((like) => like.isLike === true).length || 0}
                    </Typography>
                    <IconButton
                        sx={{
                            cursor: 'pointer',
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                            '&:hover': { backgroundColor: 'transparent' }
                        }}
                        onClick={() => handleReaction(false)}
                    >
                        {item.likes
                            ?.filter((like) => like.isLike === false)
                            .some((like) => like.userId === user?.id) ? (
                            <ThumbDownIcon color="primary" sx={{ fontSize: '45px' }} />
                        ) : (
                            <ThumbDownOffAltIcon
                                sx={{ fontSize: '40px', color: (theme) => theme.palette.text.primary }}
                            />
                        )}
                    </IconButton>
                    <Typography variant="h5" sx={{ marginTop: '13px', marginLeft: '-10px' }}>
                        {item.likes?.filter((like) => like.isLike === false).length || 0}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default ItemInfo;
