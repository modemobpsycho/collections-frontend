import { useGetItemQuery, useUpdateItemMutation } from '@/stores/api/items.api';
import { Box, Button, Card, InputLabel, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { ICollectionFields } from '@/types/collectionFields.interface';
import { IItemFields } from '@/types/itemFields.interface';
import { ITag } from '@/types/tag.interface';
import { useActions } from '@/hooks/useActions';

function ChangeItem() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const { showSnackbar } = useActions();
    const { data: item, isLoading: isLoadingItem } = useGetItemQuery(itemId!);
    const [updateItem] = useUpdateItemMutation();
    const [itemFieldsValues, setItemFieldsValues] = useState<{ [key: string]: string }>({});
    const [collectionFields, setCollectionFields] = useState<ICollectionFields[]>([]);
    const [addItemTags, setAddItemTags] = useState<string[]>([]);
    const [formDataItem, setFormDataItem] = useState<string>('');

    useEffect(() => {
        if (item) {
            setFormDataItem(item.name);
            setAddItemTags([...item.tags!.map((t) => t.tag)]);
            setItemFieldsValues({
                ...item.ItemFields?.reduce(
                    (acc, field) => ({
                        ...acc,
                        ['input' + field.fieldName]:
                            field.stringFieldValue ||
                            field.doubleFieldValue ||
                            field.dateFieldValue ||
                            field.boolFieldValue ||
                            ''
                    }),
                    {}
                )
            });
            setCollectionFields([...item.collection!.collectionFields!]);
        }
    }, [isLoadingItem]);

    const handleInputChange = (fieldId: string, value: any) => {
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
        handleInputChange('inputTag', '');
        setAddItemTags([...addItemTags, tagInput]);
    };

    const handleRemoveTag = (tag: string) => {
        setAddItemTags((prevTags) => prevTags.filter((t) => t !== tag));
    };

    const handleSubmit = async () => {
        const itemFields: IItemFields[] = collectionFields.map((field) => {
            let value: string | number | Date | boolean | undefined;
            let fieldTypeDb = '';
            switch (field.fieldType) {
                case 'string':
                    value = itemFieldsValues['input' + field.fieldName]?.trim() || undefined;
                    fieldTypeDb = 'string';
                    break;
                case 'number':
                    value = itemFieldsValues['input' + field.fieldName]
                        ? Number(itemFieldsValues['input' + field.fieldName])
                        : undefined;
                    fieldTypeDb = 'double';
                    break;
                case 'Date':
                    value = itemFieldsValues['input' + field.fieldName]
                        ? new Date(itemFieldsValues['input' + field.fieldName])
                        : undefined;
                    fieldTypeDb = 'date';
                    break;
                case 'boolean':
                    value = itemFieldsValues['input' + field.fieldName] === 'true' ? true : false;
                    itemFieldsValues['input' + field.fieldName] === 'true' ? 'true' : 'false';
                    fieldTypeDb = 'bool';
                    break;
            }

            return {
                [fieldTypeDb + 'FieldValue']: value,
                fieldName: field.fieldName
            } as any;
        });

        const tags = addItemTags.map((tag) => ({ tag }));

        await updateItem({
            item: {
                id: item!.id,
                name: formDataItem,
                tags: tags as ITag[],
                ItemFields: itemFields,
                creationDate: item!.creationDate,
                comments: undefined,
                likes: undefined
            },
            itemId: Number(itemId)
        });
        showSnackbar('Item_updated_successfully');
    };

    return (
        <>
            <Button
                variant="outlined"
                onClick={() => navigate(`/item/${itemId}`)}
                sx={{ margin: '20px', position: 'fixed', top: 'calc(60px)', left: '0' }}
            >
                <FormattedMessage id="Back_to_item" />
            </Button>
            <Box sx={{ display: 'flex', width: '50%', margin: '0 auto' }}>
                <Card
                    sx={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '20px', marginTop: '20px' }}
                >
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
                                value={formDataItem}
                                onChange={(e) => setFormDataItem(e.target.value)}
                            />
                            {collectionFields.map((field) => (
                                <Box key={field.id} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <InputLabel htmlFor={'input' + field.fieldName}>{field.fieldName}</InputLabel>
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
                                        id={'input' + field.fieldName}
                                        value={itemFieldsValues['input' + field.fieldName] || ''}
                                        onChange={(e) => handleInputChange('input' + field.fieldName, e.target.value)}
                                    ></TextField>
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
        </>
    );
}

export default ChangeItem;
