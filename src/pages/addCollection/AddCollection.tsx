import React, { useState } from 'react';
import { Box, Button, Card, CardContent, InputLabel, Typography } from '@mui/material';
import ImageCropper from '@/components/ImageCropper';
import { Navigate } from 'react-router-dom';
import { useUserState } from '@/hooks/useStoreState';
import CollectionAddData from './CollectionAddData';
import { FormattedMessage, useIntl } from 'react-intl';
import 'cropperjs/dist/cropper.css';
import { useActions } from '@/hooks/useActions';

import './AddCollection.scss';

function AddCollection() {
    const intl = useIntl();
    const { showSnackbar } = useActions();
    const { token } = useUserState();
    const [file, setFile] = useState<File>();
    const [croppedImage, setCroppedImage] = useState<string | undefined>(undefined);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            showSnackbar('Please_wait_the_image_must_be_cropped_for_successful_upload');
        }
    };

    if (!token) {
        return <Navigate to={'/'} />;
    }

    return (
        <Card className="add-collection">
            <CardContent>
                <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
                    <FormattedMessage id="Add_new_collection" />
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <InputLabel sx={{ marginTop: '20px' }}>
                        <FormattedMessage id="Upload_cover_image" />
                    </InputLabel>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Button variant="contained" className="upload-button">
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
                            <Box className="image-box">
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
                                            className="img-cropped"
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
