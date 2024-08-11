import React, { useState, useRef, useCallback, useEffect } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Box, Button, Card, CardContent, InputLabel, TextField, Typography } from '@mui/material';
import { useAddCollectionMutation, useAddCollectionImageMutation } from '../../stores/api/collections.api';
import { ICollection } from '../../types/collection.interface';
import CollectionFields from './CollectionFields';
import { ICollectionFields } from '../../types/collectionFields.interface';
import { dataUrlToFile } from '../../utils/cropUtils';

function AddCollection() {
    const [formData, setFormData] = useState({
        title: '',
        theme: '',
        description: ''
    });
    const [file, setFile] = useState<File>();
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [fields, setFields] = useState<ICollectionFields[]>([]);
    const cropperRef = useRef<HTMLImageElement>(null);

    const [addCollection, { isLoading, isSuccess, data }] = useAddCollectionMutation();
    const [addCollectionImage, { isLoading: isLoadingImage, isSuccess: isSuccessImage, data: dataImage }] =
        useAddCollectionImageMutation();

    useEffect(() => {
        if (isSuccessImage) {
            addCollection({
                id: undefined,
                ...formData,
                photoPath: dataImage || 'default.png',
                creationDate: new Date(),
                items: [],
                collectionFields: fields
            });
        }
    }, [isLoadingImage]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleCrop = useCallback(() => {
        if (cropperRef.current) {
            const cropper: any = (cropperRef.current as any).cropper;
            cropper.getCroppedCanvas().toBlob((blob: any) => {
                setCroppedImage(URL.createObjectURL(blob));
            });
        }
    }, [cropperRef]);

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
            console.log(collectionData);
            addCollection(collectionData);
        }
    };

    return (
        <Card sx={{ width: '60%', margin: 'auto' }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                    Add new collection
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <InputLabel sx={{ marginTop: '20px' }}>Upload cover image</InputLabel>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input
                            accept="image/*"
                            id="upload-image"
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="upload-image">
                            <Button variant="contained" component="span">
                                Upload File
                            </Button>
                        </label>
                        {file && (
                            <>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gap: '10px',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Cropper
                                        ref={cropperRef}
                                        src={URL.createObjectURL(file)}
                                        style={{ height: 400, maxWidth: '400px' }}
                                        aspectRatio={16 / 9}
                                        guides={true}
                                        movable={false}
                                        zoomable={false}
                                        scalable={false}
                                    />
                                    {croppedImage && (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '10px',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography variant="body2" color="textSecondary">
                                                Cropped Image Preview:
                                            </Typography>
                                            <img
                                                src={croppedImage}
                                                alt="Cropped Preview"
                                                style={{ maxWidth: '400px' }}
                                            />
                                        </Box>
                                    )}
                                </Box>
                                <Button variant="contained" onClick={handleCrop}>
                                    Crop Image
                                </Button>
                            </>
                        )}
                    </Box>
                    <InputLabel sx={{ marginTop: '20px' }}>Collection title</InputLabel>
                    <TextField id="title" name="title" value={formData.title} onChange={handleChange} />
                    <InputLabel>Collection description (optional in Markdown)</InputLabel>
                    <TextField
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <InputLabel>Collection theme</InputLabel>
                    <TextField id="theme" name="theme" value={formData.theme} onChange={handleChange} />
                    <InputLabel>Add fields in your collection</InputLabel>
                    <CollectionFields fields={fields} setFields={setFields} />
                    <Button variant="contained" sx={{ marginTop: '20px' }} onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default AddCollection;
