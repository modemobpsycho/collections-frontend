import React, { useState } from 'react';
import { Box, Button, Card, CardContent, InputLabel, Typography } from '@mui/material';
import ImageCropper from '@/components/ImageCropper';
import { Navigate } from 'react-router-dom';
import { useUserState } from '@/hooks/useStoreState';
import CollectionAddData from './CollectionAddData';
import { FormattedMessage, useIntl } from 'react-intl';

import 'cropperjs/dist/cropper.css';

function AddCollection() {
    const intl = useIntl();
    const { token } = useUserState();
    const [file, setFile] = useState<File>();
    const [croppedImage, setCroppedImage] = useState<string | undefined>(undefined);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    if (!token) {
        return <Navigate to={'/'} />;
    }

    return (
        <Card sx={{ width: '60%', margin: '10px auto' }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                    <FormattedMessage id="Add_new_collection" />
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <InputLabel sx={{ marginTop: '20px' }}>
                        <FormattedMessage id="Upload_cover_image" />
                    </InputLabel>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Button variant="contained" sx={{ width: '20%', position: 'relative' }}>
                            <label htmlFor="upload-image" style={{ width: '100%', height: '100%' }}>
                                <Typography variant="subtitle2">
                                    <FormattedMessage id="Upload_image" />
                                </Typography>
                                <input
                                    accept="image/*"
                                    id="upload-image"
                                    type="file"
                                    onChange={handleFileChange}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        opacity: 0,
                                        cursor: 'pointer'
                                    }}
                                />
                            </label>
                        </Button>
                        {file && (
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <ImageCropper
                                        file={file}
                                        setFile={setFile}
                                        croppedImage={croppedImage}
                                        setCroppedImage={setCroppedImage}
                                    />
                                </Box>
                                {croppedImage && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <img
                                            src={croppedImage}
                                            alt={intl.formatMessage({ id: 'Cropped_preview' })}
                                            style={{ maxWidth: '500px', borderRadius: '10px' }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        )}
                        <CollectionAddData file={file} croppedImage={croppedImage} />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default AddCollection;
