import {
    useDeleteCollectionMutation,
    useGetCollectionInfoQuery,
    useGetMyCollectionsQuery
} from '@/stores/api/collections.api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { variables } from '@/helpers/variables';
import { useGetUserQuery } from '@/stores/api/user.api';
import { marked } from 'marked';

function CollectionInfo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: collections } = useGetMyCollectionsQuery();
    const { isLoading: isLoadingUser, data: user } = useGetUserQuery();
    const { data: collection, isLoading } = useGetCollectionInfoQuery(String(id));
    const [deleteCollection] = useDeleteCollectionMutation();

    const handleDelete = () => {
        deleteCollection(id!);
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
                        margin: '10px auto 20px auto',
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
                                    sx={{ marginBottom: '10px', marginTop: '-10px', textAlign: 'center' }}
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
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
                            Description
                        </Typography>
                        {collection.description && collection.description?.trim() != '' && (
                            <Typography
                                variant="body2"
                                color="text.primary"
                                sx={{ marginTop: '10px' }}
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
                                        Изменить коллекцию
                                    </Link>
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ margin: '10px 10px', float: 'right' }}
                                    onClick={handleDelete}
                                >
                                    {isLoading ? <CircularProgress size={25} /> : 'Delete'}
                                </Button>
                            </Box>
                        )}

                    <Typography
                        variant="h4"
                        color="text.secondary"
                        sx={{ margin: '10px', textAlign: 'center', borderBottom: '1px solid gray' }}
                    >
                        Items
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>Items???</Box>
                    <Button variant="contained" color="primary" sx={{ margin: '10px 10px' }}>
                        Add new item
                    </Button>
                </Card>
            )}
        </>
    );
}

export default CollectionInfo;
