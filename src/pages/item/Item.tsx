import { useDeleteItemMutation, useGetItemQuery } from '@/stores/api/items.api';
import { Box, Button, Card, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ItemComments from './ItemComments';
import ItemInfo from './ItemInfo';
import { useEffect, useState } from 'react';
import ItemFields from './ItemFields';
import { FormattedMessage } from 'react-intl';
import ItemInfoTags from './ItemInfoTags';
import { useGetUserQuery } from '@/stores/api/user.api';
import { socket } from '@/socket';
import { useDispatch } from 'react-redux';
import { baseApi } from '@/stores/api/baseApi';
import { Socket } from 'socket.io-client';
import { useActions } from '@/hooks/useActions';

function Item() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const { data: user } = useGetUserQuery();
    const dispatch = useDispatch();
    const { showSnackbar } = useActions();
    const { isLoading, isSuccess, data: item } = useGetItemQuery(String(itemId));
    const [deleteItem, { isLoading: isLoadingDelete }] = useDeleteItemMutation();
    const [connection, setConnection] = useState<Socket>();

    const handleDelete = () => {
        deleteItem(Number(itemId));
        showSnackbar('Item_deleted_successfully');
        return navigate('/collections/' + item?.collection?.id);
    };

    useEffect(() => {
        socket.connect();

        if (item && item.id && socket) {
            socket.emit('joinRoom', { roomId: item.id });

            socket.on('message', () => {
                dispatch(baseApi.util.invalidateTags(['Item']));
            });
        }

        setConnection(socket);

        return () => {
            socket.disconnect();
        };
    }, [user, item]);

    return (
        <Box sx={{ position: 'relative' }}>
            <Button
                variant="outlined"
                onClick={() => navigate('/collections/' + item?.collection?.id)}
                sx={{ margin: '20px', position: 'fixed', top: 'calc(60px)', left: '0' }}
            >
                <FormattedMessage id="Back_to_collection" />
            </Button>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </Box>
            ) : (
                isSuccess &&
                item && (
                    <Card
                        sx={{
                            width: '50%',
                            padding: '20px',
                            borderRadius: '10px',
                            margin: '20px auto 20px auto',
                            backgroundColor: 'secondary.dark'
                        }}
                    >
                        <ItemInfo item={item} connection={connection as Socket} />
                        <Box sx={{ width: '100%', borderBottom: '1px solid', marginTop: '20px' }}></Box>
                        <ItemInfoTags item={item} />

                        <ItemFields item={item} />
                        <ItemComments item={item} user={user} connection={connection as Socket} />

                        {(item.collection?.userId === user?.id || user?.role === 1) && (
                            <Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <Button variant="contained" onClick={() => navigate('/item/' + item.id + '/edit')}>
                                    <FormattedMessage id="Change_item" />
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ marginLeft: 'auto' }}
                                    onClick={handleDelete}
                                >
                                    {isLoadingDelete ? <CircularProgress /> : <FormattedMessage id="Delete_item" />}
                                </Button>
                            </Box>
                        )}
                    </Card>
                )
            )}
        </Box>
    );
}

export default Item;
