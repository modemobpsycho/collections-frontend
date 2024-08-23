import { Box, Button, Card, Typography } from '@mui/material';
import { variables } from '@/helpers/variables';
import { useGetLastItemsQuery } from '@/stores/api/items.api';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function LastItems() {
    const navigate = useNavigate();
    const [itemsLimit, setItemLimit] = useState(variables.ITEMS_MIN);
    const { data: items } = useGetLastItemsQuery(itemsLimit);
    const maxItems = variables.ITEMS_MAX;
    const minItems = variables.ITEMS_MIN;

    const handleLoadMore = () => {
        if (itemsLimit + variables.ITEMS_INC <= maxItems) {
            setItemLimit(itemsLimit + 5);
        }
    };

    const handleResetItems = () => {
        setItemLimit(minItems);
    };

    return (
        <>
            {items && items.length > 0 && (
                <Box>
                    <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '40px' }}>
                        <FormattedMessage id="Last_items" />
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            justifyContent: 'center',
                            gap: '20px',
                            marginTop: '20px'
                        }}
                    >
                        {Array.isArray(items) &&
                            items &&
                            items?.map((item) => (
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
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '85%'
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '50px' }}>
                                            <img
                                                src={variables.BACKEND_URL + item.collection.photoPath}
                                                alt={item.name}
                                                style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: '10px',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '70%'
                                            }}
                                        >
                                            <Typography
                                                noWrap
                                                variant="h6"
                                                sx={{
                                                    width: '100%',
                                                    fontSize: '26px',
                                                    marginTop: '-10px',
                                                    alignItems: 'center',
                                                    marginLeft: '35px',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                {item.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center' }}>
                                        {item.collection.title}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="text.secondary"
                                        sx={{
                                            fontSize: '12px',
                                            width: '100%',
                                            alignItems: 'center',
                                            marginLeft: 'auto',
                                            textAlign: 'center',
                                            marginTop: '-5px'
                                        }}
                                    >
                                        {new Date(item.creationDate).toLocaleDateString()}
                                    </Typography>
                                </Card>
                            ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        {itemsLimit < maxItems && (
                            <Button variant="outlined" sx={{ marginTop: '20px' }} onClick={handleLoadMore}>
                                <ExpandMoreIcon color="primary" sx={{ fontSize: '40px' }} />
                            </Button>
                        )}
                        {itemsLimit > minItems && (
                            <Button variant="outlined" sx={{ marginTop: '20px' }} onClick={handleResetItems}>
                                <ExpandLessIcon color="primary" sx={{ fontSize: '40px' }} />
                            </Button>
                        )}
                    </Box>
                </Box>
            )}
        </>
    );
}

export default LastItems;
