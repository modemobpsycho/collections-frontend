import { Link } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { ICollection } from '@/types/collection.interface';
import { variables } from '@/helpers/variables';
import { FormattedMessage } from 'react-intl';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import CategoryIcon from '@mui/icons-material/Category';

import './CollectionCard.scss';

function CollectionCard({ collection }: { collection: ICollection }) {
    return (
        <Card
            className="collection-card-wrapper"
            sx={{
                backgroundColor: 'secondary.dark'
            }}
        >
            <CardContent className="content">
                <Box className="content-header">
                    <img
                        src={variables.BACKEND_URL + collection.photoPath}
                        alt={collection.title}
                        className="content-header-img"
                    />
                    <Box className="content-header-titles">
                        <Typography className="content-header-titles-title">{collection.title}</Typography>
                        <Typography color="text.secondary" noWrap className="content-header-titles-theme">
                            {collection.theme}
                        </Typography>
                    </Box>
                </Box>
                <Box className="content-description">
                    <Typography color="text.secondary" className="content-description-created">
                        {collection.user && (
                            <>
                                {<FormattedMessage id="Created_by" />} {collection.user.fullName}
                            </>
                        )}
                    </Typography>
                    <Typography color="text.secondary" className="content-description-date">
                        {new Date(collection.creationDate).toLocaleDateString()}
                    </Typography>
                </Box>
            </CardContent>
            <Box className="block-icons">
                <Box className="block-icons-wrapper">
                    <Box className="block-icons-like">
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
                    <Box className="block-icons-dislike">
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
                    <Box className="block-icons-items">
                        {collection.items && (
                            <Box sx={{ display: 'flex' }}>
                                <CategoryIcon sx={{ fontSize: '30px' }} />
                                <Typography variant="subtitle1" sx={{ marginLeft: '3px' }}>
                                    {collection.items?.length}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
                <Button variant="contained" color="primary" className="block-icons-view">
                    <Link to={`/collections/${collection.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                        <FormattedMessage id="View_collection" />
                    </Link>
                </Button>
            </Box>
        </Card>
    );
}

export default CollectionCard;
