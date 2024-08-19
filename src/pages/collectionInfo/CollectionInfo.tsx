import {
    useDeleteCollectionMutation,
    useGetCollectionInfoQuery,
    useGetMyCollectionsQuery
} from '@/stores/api/collections.api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { variables } from '@/helpers/variables';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useGetUserQuery } from '@/stores/api/user.api';
import { marked } from 'marked';
import AddItem from './AddItem';
import CollectionItems from './CollectionItems';
import { useGetItemsQuery } from '@/stores/api/items.api';
import { FormattedMessage } from 'react-intl';

function CollectionInfo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: collections } = useGetMyCollectionsQuery();
    const { data: items } = useGetItemsQuery(Number(id));
    const { data: user } = useGetUserQuery();
    const [deleteCollection, { isLoading: isLoadingDelete }] = useDeleteCollectionMutation();
    const { data: collection } = useGetCollectionInfoQuery(String(id));

    const handleDelete = () => {
        deleteCollection(Number(id));
        return navigate('/my-collections');
    };

    return (
        <>
            {collection && (
                <Card
                    sx={{
                        width: '50%',
                        padding: '10px',
                        borderRadius: '10px',
                        margin: '20px auto 20px auto',
                        backgroundColor: 'secondary.dark'
                    }}
                >
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    margin: '0 auto'
                                }}
                            >
                                <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
                                    {collection.title}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    sx={{ marginBottom: '10px', marginTop: '-5px', textAlign: 'center' }}
                                >
                                    {collection.theme}
                                </Typography>
                            </Box>
                            <img
                                src={variables.BACKEND_URL + collection.photoPath}
                                alt={collection.title}
                                style={{ width: '90%', borderRadius: '10px', margin: '0 auto 10px' }}
                            />
                        </Box>
                        <Typography variant="body1" sx={{ marginTop: '10px' }}>
                            {collection.user && (
                                <>
                                    {<FormattedMessage id="Created_by" />} {collection.user.fullName}
                                </>
                            )}
                        </Typography>
                        <Typography variant="h6" sx={{ marginTop: '10px', textAlign: 'center', marginBottom: '-10px' }}>
                            <FormattedMessage id="Description" />
                        </Typography>
                        {collection.description && collection.description?.trim() != '' && (
                            <Typography
                                variant="body1"
                                color="text.primary"
                                sx={{ marginTop: '10px', textAlign: 'justify' }}
                                dangerouslySetInnerHTML={{ __html: marked.parse(collection.description) }}
                            ></Typography>
                        )}
                    </CardContent>
                    {user &&
                        ((collections && collections.some((item) => item.id === collection.id)) || user.role === 1) && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ margin: '10px 10px', float: 'right' }}
                                >
                                    <Link
                                        to={`/collections/${collection.id}/edit`}
                                        style={{ textDecoration: 'none', color: 'white' }}
                                    >
                                        <FormattedMessage id="Change_collection" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ margin: '10px 10px', float: 'right' }}
                                    onClick={handleDelete}
                                >
                                    {isLoadingDelete ? (
                                        <CircularProgress size={25} />
                                    ) : (
                                        <FormattedMessage id="Delete_collection" />
                                    )}
                                </Button>
                            </Box>
                        )}

                    <Typography variant="h4" color="text.primary" sx={{ margin: '10px', textAlign: 'center' }}>
                        <FormattedMessage id="Items" />
                    </Typography>

                    {(collection.user?.id === user?.id || user!.role === 1) && <AddItem dataCollection={collection} />}
                    {items && items.length > 0 ? (
                        <CollectionItems items={items} />
                    ) : (
                        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <Typography variant="h4" sx={{}}>
                                <FormattedMessage id="There_are_no_items_in_this_collection_yet" />
                            </Typography>
                            <SentimentVeryDissatisfiedIcon sx={{ fontSize: '30px', marginTop: 'auto' }} />
                        </Box>
                    )}
                </Card>
            )}
        </>
    );
}

export default CollectionInfo;
