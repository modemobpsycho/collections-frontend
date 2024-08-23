import { IItem } from '@/types/item.interface';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ItemInfoTags({ item }: { item: IItem }) {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '5px',
                marginTop: '20px',
                borderBottom: '1px solid',
                paddingBottom: '20px',
                marginBottom: '20px'
            }}
        >
            {item.tags?.map((tag) => (
                <Box
                    key={tag.id}
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '5px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        overflow: 'hidden'
                    }}
                    onClick={() => navigate(`/search/${tag.tag}`)}
                >
                    {tag.tag}
                </Box>
            ))}
        </Box>
    );
}

export default ItemInfoTags;
