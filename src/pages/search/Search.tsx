import { variables } from '@/helpers/variables';
import { useSearchItemsQuery } from '@/stores/api/items.api';
import { Box, Card, CircularProgress, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { FormattedMessage } from 'react-intl';

function Search() {
    const { search } = useParams();
    const navigate = useNavigate();
    const [searchLimit, setSearchLimit] = useState(variables.SEARCH_MIN);
    const { data, isLoading } = useSearchItemsQuery(
        { contain: search!, limit: searchLimit },
        {
            skip: search === ''
        }
    );

    return (
        <Box
            sx={{
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                margin: 'auto',
                width: '80%'
            }}
        >
            <Card
                sx={{
                    textAlign: 'center',
                    marginTop: '20px',
                    backgroundColor: 'secondary.dark',
                    padding: '10px',
                    borderRadius: '10px'
                }}
            >
                <Typography variant="h4">
                    <FormattedMessage id="Searching_for" /> <strong>{search}</strong>
                </Typography>
            </Card>

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {data && data.length > 0 ? (
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                justifyContent: 'center',
                                gap: '20px',
                                marginTop: '20px'
                            }}
                        >
                            {data &&
                                data?.map((item) => (
                                    <Card
                                        key={item.id}
                                        onClick={() => navigate(`/item/${item.id}`)}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: '10px',
                                            borderRadius: '10px',
                                            backgroundColor: 'secondary.dark',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <img
                                                src={variables.BACKEND_URL + item.collection?.photoPath}
                                                alt={item.name}
                                                style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <Typography variant="h6" sx={{ fontSize: '22px', textAlign: 'center' }}>
                                                {item.name.split(new RegExp(`(${search})`, 'gi')).map((part, index) =>
                                                    part.toLowerCase() === search?.toLowerCase() ? (
                                                        <span
                                                            style={{
                                                                color: 'red',
                                                                fontSize: '22px'
                                                            }}
                                                            key={index}
                                                        >
                                                            {part}
                                                        </span>
                                                    ) : (
                                                        part
                                                    )
                                                )}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: '5px', marginLeft: 'auto' }}>
                                                <Typography variant="subtitle1">
                                                    <QuestionAnswerIcon sx={{ marginRight: '5px', fontSize: '25px' }} />
                                                    {item.comments?.length}
                                                </Typography>
                                                <Typography variant="subtitle1">
                                                    <FavoriteIcon sx={{ marginRight: '5px', fontSize: '25px' }} />
                                                    {item.likes?.filter((like) => like.isLike === true).length}
                                                </Typography>
                                                <Typography variant="subtitle1">
                                                    <ThumbDownAltIcon sx={{ marginRight: '5px', fontSize: '25px' }} />
                                                    {item.likes?.filter((like) => like.isLike === false).length}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Typography
                                            variant="subtitle2"
                                            color="text.secondary"
                                            sx={{ marginBottom: '10px', marginLeft: 'auto', marginTop: 'auto' }}
                                        >
                                            {item.collection?.title
                                                .split(new RegExp(`(${search})`, 'gi'))
                                                .map((part, index) =>
                                                    part.toLowerCase() === search?.toLowerCase() ? (
                                                        <span style={{ color: 'red' }} key={index}>
                                                            {part}
                                                        </span>
                                                    ) : (
                                                        part
                                                    )
                                                )}
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: '5px',
                                                flexWrap: 'wrap',
                                                maxHeight: '70px',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {item.tags &&
                                                item.tags.map((tag) => (
                                                    <Box
                                                        key={tag.id}
                                                        sx={{
                                                            backgroundColor: 'black',
                                                            padding: '3px',
                                                            borderRadius: '10px',
                                                            cursor: 'pointer',
                                                            color: 'white'
                                                        }}
                                                    >
                                                        <Typography variant="body1">
                                                            {tag.tag
                                                                .split(new RegExp(`(${search})`, 'gi'))
                                                                .map((part, index) =>
                                                                    part.toLowerCase() === search?.toLowerCase() ? (
                                                                        <span
                                                                            style={{ color: 'red', fontSize: '18px' }}
                                                                            key={index}
                                                                        >
                                                                            {part}
                                                                        </span>
                                                                    ) : (
                                                                        part
                                                                    )
                                                                )}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                        </Box>
                                    </Card>
                                ))}
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Typography variant="h4">
                                <FormattedMessage id="No_items_found" />
                            </Typography>
                        </Box>
                    )}
                </>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {data && searchLimit <= data.length && (
                    <IconButton
                        sx={{ marginTop: '20px' }}
                        onClick={() => setSearchLimit(searchLimit + variables.SEARCH_INC)}
                    >
                        <ExpandMoreIcon color="primary" sx={{ fontSize: '40px' }} />
                    </IconButton>
                )}
                {data && searchLimit > variables.SEARCH_MIN && (
                    <IconButton sx={{ marginTop: '20px' }} onClick={() => setSearchLimit(variables.SEARCH_MIN)}>
                        <ExpandLessIcon color="primary" sx={{ fontSize: '40px' }} />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
}

export default Search;
