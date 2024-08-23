import { ICollection } from '@/types/collection.interface';
import { Box, Button, InputLabel, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useAddItemMutation } from '@/stores/api/items.api';
import { IItemFields } from '@/types/itemFields.interface';
import { FormattedMessage, useIntl } from 'react-intl';

function AddItem({ dataCollection }: { dataCollection: ICollection }) {
    const intl = useIntl();
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [addItemTags, setAddItemTags] = useState<string[]>([]);
    const [itemFieldsValues, setItemFieldsValues] = useState<{ [key: string]: string }>({});
    const [addItem] = useAddItemMutation();

    const handleInputChange = (fieldId: string, value: string) => {
        setItemFieldsValues((prevValues) => ({
            ...prevValues,
            [fieldId]: value
        }));
    };

    const handleAddItemButton = () => {
        setIsAddingItem(!isAddingItem);
        setAddItemTags([]);
        setItemFieldsValues({});
        handleInputChange('inputTag', '');
    };

    const handleAddTag = () => {
        const tagInput = itemFieldsValues['inputTag'] || '';
        if (tagInput.trim().includes(' ') || tagInput.trim() === '' || addItemTags.includes(tagInput)) {
            return;
        }
        setAddItemTags([...addItemTags, tagInput]);
        handleInputChange('inputTag', '');
    };

    const handleAddItem = () => {
        if (dataCollection.collectionFields) {
            const itemFields: Omit<IItemFields, 'id'>[] = dataCollection.collectionFields.map((field) => {
                let value: string | number | Date | boolean | undefined;
                let fieldTypeDb = '';
                switch (field.fieldType) {
                    case 'string':
                        value = itemFieldsValues['input' + field.id]?.trim() || undefined;
                        fieldTypeDb = 'string';
                        break;
                    case 'number':
                        value = itemFieldsValues['input' + field.id]
                            ? Number(itemFieldsValues['input' + field.id])
                            : undefined;
                        fieldTypeDb = 'double';
                        break;
                    case 'Date':
                        value = itemFieldsValues['input' + field.id]
                            ? new Date(itemFieldsValues['input' + field.id])
                            : undefined;
                        fieldTypeDb = 'date';
                        break;
                    case 'boolean':
                        value = itemFieldsValues['input' + field.id] === 'true' ? true : false;
                        itemFieldsValues['input' + field.id] === 'true' ? 'true' : 'false';
                        fieldTypeDb = 'bool';
                        break;
                }
                return {
                    [fieldTypeDb + 'FieldValue']: value,
                    fieldName: field.fieldName
                } as Omit<IItemFields, 'id'>;
            });

            addItem({
                collectionId: dataCollection.id as number,
                item: {
                    name: itemFieldsValues['inputItemName'] || '',
                    tags: addItemTags.map((tag) => ({ tag })) as any,
                    creationDate: new Date(),
                    ItemFields: itemFields as any,
                    comments: undefined,
                    likes: undefined
                }
            });
        }

        setIsAddingItem(false);
        setAddItemTags([]);
        setItemFieldsValues({});
    };

    const handleRemoveTag = (tag: string) => {
        setAddItemTags((prevTags) => prevTags.filter((t) => t !== tag));
    };

    return (
        <>
            <Button variant="contained" sx={{ width: '100%', margin: '10px 0 10px' }} onClick={handleAddItemButton}>
                {isAddingItem ? <FormattedMessage id="Cancel" /> : <FormattedMessage id="Add_item" />}
            </Button>
            {isAddingItem && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                            <InputLabel htmlFor="inputItemName">
                                <FormattedMessage id="Item_name" />
                            </InputLabel>
                            <TextField
                                type="text"
                                id="inputItemName"
                                label={<FormattedMessage id="Name_item" />}
                                sx={{ color: 'black' }}
                                value={itemFieldsValues['inputItemName'] || ''}
                                onChange={(e) => handleInputChange('inputItemName', e.target.value)}
                            />
                            {dataCollection.collectionFields &&
                                dataCollection.collectionFields.map((field) => (
                                    <Box key={field.id}>
                                        <InputLabel htmlFor={'input' + field.id}>{field.fieldName}</InputLabel>
                                        <TextField
                                            className={field.fieldType === 'boolean' ? ' checkbox' : ''}
                                            type={
                                                field.fieldType === 'boolean'
                                                    ? 'checkbox'
                                                    : field.fieldType === 'Date'
                                                    ? 'datetime-local'
                                                    : field.fieldType === 'number'
                                                    ? 'number'
                                                    : 'text'
                                            }
                                            sx={
                                                field.fieldType === 'boolean'
                                                    ? { width: '20px', height: '20px' }
                                                    : { color: 'black', width: '100%' }
                                            }
                                            id={'input' + field.id}
                                            value={itemFieldsValues['input' + field.id] || ''}
                                            onChange={(e) => handleInputChange('input' + field.id, e.target.value)}
                                        />
                                    </Box>
                                ))}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <InputLabel htmlFor="inputTag">
                                    <FormattedMessage id="Tags" />
                                </InputLabel>
                                <Box sx={{ display: 'flex', gap: '5px', marginBottom: '25px' }}>
                                    <TextField
                                        type="text"
                                        id="inputTag"
                                        label={<FormattedMessage id="Tag" />}
                                        sx={{ width: '100%', color: 'black' }}
                                        value={itemFieldsValues['inputTag'] || ''}
                                        onChange={(e) => handleInputChange('inputTag', e.target.value)}
                                    />
                                    <Button variant="contained" onClick={handleAddTag}>
                                        <AddIcon />
                                    </Button>
                                </Box>
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
                    <Button variant="contained" onClick={handleAddItem} sx={{ marginBottom: '10px' }}>
                        <FormattedMessage id="Save" />
                    </Button>
                </Box>
            )}
        </>
    );
}

export default AddItem;