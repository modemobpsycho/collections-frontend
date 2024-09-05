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
import { FormattedMessage } from 'react-intl';
import CsvLink from '@/components/csvLink/CsvLink';
import { useActions } from '@/hooks/useActions';

import './CollectionInfo.scss';

function CollectionInfo() {
    const { id } = useParams();
    const { showSnackbar } = useActions();
    const navigate = useNavigate();
    const { data: collections } = useGetMyCollectionsQuery(variables.USER_COLLECTIONS_MAX);
    const { data: user } = useGetUserQuery();
    const [deleteCollection, { isLoading: isLoadingDelete }] = useDeleteCollectionMutation();
    const { data: collection } = useGetCollectionInfoQuery(String(id));

    const handleDelete = () => {
        deleteCollection(Number(id));
        showSnackbar('Collection_deleted_successfully');
        return navigate('/my-collections');
    };

    return (
        <>
            {collection ? (
                <Card
                    className="collection-info"
                    sx={{
                        backgroundColor: 'secondary.dark'
                    }}
                >
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    margin: '0 auto',
                                    width: '100%'
                                }}
                            >
                                <Typography className="title">{collection.title}</Typography>
                                <Typography color="text.secondary" className="theme">
                                    {collection.theme}
                                </Typography>
                            </Box>
                            <img
                                src={variables.BACKEND_URL + collection.photoPath}
                                alt={collection.title}
                                style={{ width: '90%', borderRadius: '10px', margin: '0 auto 10px' }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Typography className="created-by">
                                {collection.user && (
                                    <>
                                        {<FormattedMessage id="Created_by" />} {collection.user.fullName}
                                    </>
                                )}
                            </Typography>
                            <CsvLink data={collection} />
                        </Box>
                        <Typography className="description">
                            <FormattedMessage id="Description" />
                        </Typography>
                        {collection.description && collection.description?.trim() != '' && (
                            <Typography
                                color="text.primary"
                                className="description-text"
                                dangerouslySetInnerHTML={{ __html: marked.parse(collection.description) }}
                            ></Typography>
                        )}
                    </CardContent>
                    {user &&
                        ((collections && collections.some((item) => item.id === collection.id)) || user.role === 1) && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                    className="buttons"
                                    variant="contained"
                                    color="primary"
                                    sx={{ margin: '10px 15px', float: 'right' }}
                                >
                                    <Link
                                        to={`/collections/${collection.id}/edit`}
                                        style={{ textDecoration: 'none', color: 'white' }}
                                    >
                                        <FormattedMessage id="Change_collection" />
                                    </Link>
                                </Button>
                                <Button
                                    className="buttons"
                                    variant="contained"
                                    color="error"
                                    sx={{ margin: '10px 15px', float: 'right' }}
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

                    <Typography
                        variant="h4"
                        color="text.primary"
                        sx={{ textAlign: 'center', width: '100%', borderBottom: '1px solid', paddingBottom: '10px' }}
                    >
                        <FormattedMessage id="Items" />
                    </Typography>

                    {collection.user?.id === user?.id && <AddItem dataCollection={collection} />}
                    {collection.items && collection.items.length > 0 ? (
                        <CollectionItems items={collection.items} />
                    ) : (
                        <Typography variant="h4" sx={{ textAlign: 'center', margin: '20px' }}>
                            <FormattedMessage id="There_are_no_items_in_this_collection_yet" />
                        </Typography>
                    )}
                </Card>
            ) : (
                <Typography variant="h4" sx={{ textAlign: 'center', margin: '20px' }}>
                    <CircularProgress />
                </Typography>
            )}
        </>
    );
}

export default CollectionInfo;
