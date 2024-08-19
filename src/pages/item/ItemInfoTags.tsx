import { IItem } from '@/types/item.interface';
import { Box } from '@mui/material';

function ItemInfoTags({ item }: { item: IItem }) {
    return (
        <Box sx={{ display: 'flex', gap: '5px', marginTop: '20px' }}>
            {item.tags?.map((tag) => (
                <Box
                    key={tag.id}
                    sx={{
                        backgroundColor: 'cyan',
                        color: 'black',
                        padding: '5px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        overflow: 'hidden'
                    }}
                >
                    {tag.tag}
                </Box>
            ))}
        </Box>
    );
}

export default ItemInfoTags;
