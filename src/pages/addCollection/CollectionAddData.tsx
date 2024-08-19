import { Button, CircularProgress, InputLabel, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { dataUrlToFile } from '@/utils/cropUtils';
import { ICollection } from '@/types/collection.interface';
import { useAddCollectionImageMutation, useAddCollectionMutation } from '../../stores/api/collections.api';
import CollectionFields from './CollectionFields';
import { ICollectionFields } from '@/types/collectionFields.interface';
import { FormattedMessage } from 'react-intl';

function CollectionAddData({ croppedImage, file }: { croppedImage: string | undefined; file: File | undefined }) {
    const [addCollection, { isLoading: isLoadingCollection }] = useAddCollectionMutation();
    const [addCollectionImage, { isLoading: isLoadingImage, isSuccess: isSuccessImage, data: dataImage }] =
        useAddCollectionImageMutation();

    const [fields, setFields] = useState<ICollectionFields[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        theme: '',
        description: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (isSuccessImage) {
            addCollection({
                ...formData,
                photoPath: dataImage || 'default.png',
                items: [],
                collectionFields: fields
            });
        }
    }, [isLoadingImage]);

    const handleSubmit = async () => {
        if (croppedImage && file) {
            const formDataImage = new FormData();
            let imageFile = await dataUrlToFile(croppedImage, file.name);
            formDataImage.append('file', imageFile, imageFile.name);
            addCollectionImage(formDataImage);
        } else {
            const collectionData: ICollection = {
                id: undefined,
                ...formData,
                photoPath: dataImage || 'default.png',
                creationDate: new Date(),
                items: [],
                collectionFields: fields
            };
            addCollection(collectionData);
        }
    };

    return (
        <>
            <InputLabel sx={{ marginTop: '20px' }}>
                <FormattedMessage id="Collection_title" />
            </InputLabel>
            <TextField
                id="title"
                label={<FormattedMessage id="Title" />}
                name="title"
                value={formData.title}
                onChange={handleChange}
            />
            <InputLabel>
                <FormattedMessage id="Collection_description" />
            </InputLabel>
            <TextField
                id="description"
                name="description"
                label={<FormattedMessage id="Description" />}
                value={formData.description}
                onChange={handleChange}
            />
            <InputLabel>
                <FormattedMessage id="Collection_theme" />
            </InputLabel>
            <TextField
                id="theme"
                label={<FormattedMessage id="Theme" />}
                name="theme"
                value={formData.theme}
                onChange={handleChange}
            />
            <InputLabel>
                <FormattedMessage id="Add_fields_in_your_collection" />
            </InputLabel>
            <CollectionFields fields={fields} setFields={setFields} />
            <Button variant="contained" sx={{ marginTop: '20px' }} onClick={handleSubmit}>
                {isLoadingCollection ? (
                    <CircularProgress color="inherit" size={25} />
                ) : (
                    <FormattedMessage id="Submit" />
                )}
            </Button>
        </>
    );
}

export default CollectionAddData;
