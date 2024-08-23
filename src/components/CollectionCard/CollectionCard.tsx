import { Link } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { ICollection } from '@/types/collection.interface';
import { variables } from '@/helpers/variables';
import { FormattedMessage } from 'react-intl';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import CategoryIcon from '@mui/icons-material/Category';

function CollectionCard({ collection }: { collection: ICollection }) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: 'secondary.dark'
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <img
                        src={variables.BACKEND_URL + collection.photoPath}
                        alt={collection.title}
                        style={{ width: '50%', borderRadius: '10px' }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '0 auto',
                            width: 'calc(50% - 10px)'
                        }}
                    >
                        <Typography noWrap variant="h5" sx={{ textAlign: 'center', width: '100%', fontSize: '26px' }}>
                            {collection.title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            noWrap
                            sx={{
                                marginBottom: '10px',
                                textAlign: 'center',
                                width: '100%'
                            }}
                        >
                            {collection.theme}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ marginTop: '10px' }}>
                        {collection.user && (
                            <>
                                {<FormattedMessage id="Created_by" />} {collection.user.fullName}
                            </>
                        )}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{ marginTop: '10px', marginLeft: 'auto' }}
                    >
                        {new Date(collection.creationDate).toLocaleDateString()}
                    </Typography>
                </Box>
            </CardContent>
            <Box sx={{ display: 'flex', width: '100%', padding: '10px', gap: '10px', paddingLeft: '15px' }}>
                <Box sx={{ marginTop: 'auto', display: 'flex', gap: '5px' }}>
                    <FavoriteIcon sx={{ fontSize: '30px' }} />
                    <Typography variant="subtitle1">
                        {collection.items &&
                            collection.items.reduce(
                                (total, currentItem) =>
                                    total + currentItem.likes!.filter((like) => like.isLike === true).length,
                                0
                            )}
                    </Typography>
                </Box>
                <Box sx={{ marginTop: 'auto', display: 'flex', gap: '5px' }}>
                    <ThumbDownAltIcon sx={{ fontSize: '30px' }} />
                    <Typography variant="subtitle1">
                        {collection.items &&
                            collection.items.reduce(
                                (total, currentItem) =>
                                    total + currentItem.likes!.filter((like) => like.isLike === false).length,
                                0
                            )}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    {collection.items && (
                        <Box sx={{ display: 'flex' }}>
                            <CategoryIcon sx={{ fontSize: '30px' }} />
                            <Typography variant="subtitle1" sx={{ marginLeft: '3px' }}>
                                {collection.items?.length}
                            </Typography>
                        </Box>
                    )}
                </Box>
                <Button variant="contained" color="primary" sx={{ marginLeft: 'auto', marginRight: '5px' }}>
                    <Link to={`/collections/${collection.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                        <FormattedMessage id="View_collection" />
                    </Link>
                </Button>
            </Box>
        </Card>
    );
}

export default CollectionCard;
