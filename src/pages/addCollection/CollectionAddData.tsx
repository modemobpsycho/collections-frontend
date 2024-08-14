import { Button, InputLabel, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { dataUrlToFile } from '@/utils/cropUtils';
import { ICollection } from '@/types/collection.interface';
import { useAddCollectionImageMutation, useAddCollectionMutation } from '../../stores/api/collections.api';
import CollectionFields from './CollectionFields';
import { ICollectionFields } from '@/types/collectionFields.interface';

function CollectionAddData({ croppedImage, file }: { croppedImage: string | undefined; file: File | undefined }) {
    const [addCollection] = useAddCollectionMutation();
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
            <InputLabel sx={{ marginTop: '20px' }}>Collection title</InputLabel>
            <TextField id="title" name="title" value={formData.title} onChange={handleChange} />
            <InputLabel>Collection description (optional in Markdown)</InputLabel>
            <TextField id="description" name="description" value={formData.description} onChange={handleChange} />
            <InputLabel>Collection theme</InputLabel>
            <TextField id="theme" name="theme" value={formData.theme} onChange={handleChange} />
            <InputLabel>Add fields in your collection</InputLabel>
            <CollectionFields fields={fields} setFields={setFields} />
            <Button variant="contained" sx={{ marginTop: '20px' }} onClick={handleSubmit}>
                Submit
            </Button>
        </>
    );
}

export default CollectionAddData;