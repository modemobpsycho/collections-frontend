import { useGetItemQuery } from '@/stores/api/items.api';
import { Box, Button, Card, InputLabel, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';

function ChangeItem() {
    const { itemId } = useParams();
    const { data: item, isLoading: isLoadingItem } = useGetItemQuery(itemId!);
    const [itemFieldsValues, setItemFieldsValues] = useState<{ [key: string]: string }>({});
    const [addItemTags, setAddItemTags] = useState<string[]>([]);

    const [formDataItem, setFormDataItem] = useState({
        ...item
    });

    useEffect(() => {
        if (item) {
            setFormDataItem({
                ...item
            });
        }
    }, [isLoadingItem]);

    const handleInputChange = (fieldId: string, value: string) => {
        setItemFieldsValues((prevValues) => ({
            ...prevValues,
            [fieldId]: value
        }));
        console.log(itemFieldsValues);
    };

    const handleAddTag = () => {
        const tagInput = itemFieldsValues['inputTag'] || '';
        if (tagInput.trim().includes(' ') || tagInput.trim() === '' || addItemTags.includes(tagInput)) {
            return;
        }
        setAddItemTags([...addItemTags, tagInput]);
        handleInputChange('inputTag', '');
    };

    const handleRemoveTag = (tag: string) => {
        setAddItemTags((prevTags) => prevTags.filter((t) => t !== tag));
    };

    const handleSubmit = async () => {
        console.log({ ...formDataItem, tags: addItemTags });
    };
    return (
        <Box sx={{ display: 'flex', width: '50%', margin: '0 auto' }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
                    <FormattedMessage id="Change_item_page" />
                </Typography>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '50%' }}>
                        <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                            <FormattedMessage id="Change_item_fields" />
                        </Typography>
                        <InputLabel htmlFor="inputName">
                            <FormattedMessage id="Item_name" />
                        </InputLabel>
                        <TextField
                            id="inputName"
                            name="name"
                            value={formDataItem?.name}
                            onChange={(e) => setFormDataItem({ ...formDataItem, name: e.target.value })}
                        />
                        {item?.ItemFields?.map((field) => (
                            <Box key={field.id} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <InputLabel htmlFor={'input' + field.id}>{field.fieldName}</InputLabel>
                                <TextField id={'input' + field.id}></TextField>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '50%' }}>
                        <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                            <FormattedMessage id="Tags" />
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <InputLabel htmlFor="inputTag">
                                <FormattedMessage id="Tags" />
                            </InputLabel>
                            <Box sx={{ display: 'flex', gap: '5px', marginBottom: '25px' }}>
                                <TextField
                                    type="text"
                                    id="inputTag"
                                    sx={{ width: '100%', color: 'black' }}
                                    value={itemFieldsValues['inputTag'] || ''}
                                    onChange={(e) => handleInputChange('inputTag', e.target.value)}
                                />
                                <Button variant="contained" onClick={handleAddTag}>
                                    <AddIcon />
                                </Button>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                {addItemTags.map((tag) => (
                                    <Box
                                        key={tag}
                                        sx={{
                                            backgroundColor: 'cyan',
                                            color: 'black',
                                            padding: '5px',
                                            borderRadius: '10px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleRemoveTag(tag)}
                                    >
                                        {tag}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Button variant="contained" sx={{ width: '100%', margin: '20px 0 10px' }} onClick={handleSubmit}>
                    <FormattedMessage id="Save" />
                </Button>
            </Card>
        </Box>
    );
}

export default ChangeItem;
