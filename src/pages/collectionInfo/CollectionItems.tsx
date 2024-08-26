import { IItem } from '@/types/item.interface';
import { Box, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

import './CollectionItems.scss';

function CollectionItems({ items }: { items: IItem[] | undefined }) {
    const navigate = useNavigate();
    return (
        <Box
            className="collection-items"
        >
            {items &&
                items.map((item) => (
                    <Card
                        key={item.id}
                        sx={{
                            cursor: 'pointer',
                            padding: '10px',
                            borderRadius: '10px'
                        }}
                        onClick={() => {
                            navigate(`/item/${item.id}`);
                        }}
                    >
                        <Box sx={{ display: 'flex' }}>
                            <Typography
                                className="item-name"
                            >
                                {item.name}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
                                <Typography variant="subtitle1" sx={{ marginLeft: 'auto' }}>
                                    <QuestionAnswerIcon sx={{ marginRight: '5px', fontSize: '25px' }} />
                                    {item.comments?.length}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ marginLeft: 'auto' }}>
                                    <FavoriteIcon sx={{ marginRight: '5px', fontSize: '25px' }} />
                                    {item.likes?.filter((like) => like.isLike === true).length}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ marginLeft: 'auto' }}>
                                    <ThumbDownAltIcon sx={{ marginRight: '5px', fontSize: '25px' }} />
                                    {item.likes?.filter((like) => like.isLike === false).length}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                marginTop: '10px'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '5px',
                                    flexWrap: 'wrap',
                                    maxHeight: '75px',
                                    overflowY: 'hidden'
                                }}
                            >
                                {item.tags &&
                                    item.tags.map((tag) => (
                                        <Box
                                            key={tag.id}
                                            sx={{
                                                backgroundColor: 'black',
                                                padding: '5px',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                width: 'fit-content',
                                                overflow: 'hidden',
                                                color: 'white'
                                            }}
                                        >
                                            <Typography variant="body1">{tag.tag}</Typography>
                                        </Box>
                                    ))}
                            </Box>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{ marginLeft: 'auto', marginTop: 'auto' }}
                            >
                                {new Date(item.creationDate).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Card>
                ))}
        </Box>
    );
}

export default CollectionItems;
