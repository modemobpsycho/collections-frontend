import { useDeleteItemMutation, useGetItemQuery } from '@/stores/api/items.api';
import { Box, Button, Card, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ItemComments from './ItemComments';
import ItemInfo from './ItemInfo';
import { useEffect } from 'react';
import ItemFields from './ItemFields';
import { FormattedMessage } from 'react-intl';
import ItemInfoTags from './ItemInfoTags';
import { useGetUserQuery } from '@/stores/api/user.api';

function Item() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const { data: user } = useGetUserQuery();
    const { isLoading, isSuccess, data: item } = useGetItemQuery(String(itemId));
    const [deleteItem, { isLoading: isLoadingDelete }] = useDeleteItemMutation();

    const handleDelete = () => {
        deleteItem(Number(itemId));
        return navigate('/collections/' + item?.collection?.id);
    };

    useEffect(() => {});
    useEffect(() => {
        if (isSuccess) {
            console.log(item);
        }
    }, [isLoading]);

    return (
        <div>
            {isLoading ? (
                <CircularProgress />
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
                        <ItemInfo item={item} />
                        <Box sx={{ width: '100%', borderBottom: '1px solid', marginTop: '20px' }}></Box>
                        <ItemInfoTags item={item} />

                        <ItemFields item={item} />
                        <ItemComments item={item} user={user} />

                        {item.collection?.user?.id === user?.id ||
                            (user?.role === 1 && (
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
                            ))}
                    </Card>
                )
            )}
        </div>
    );
}

export default Item;
