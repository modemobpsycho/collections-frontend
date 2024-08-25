import { useState } from 'react';
import { Box, Button, Card, InputLabel, Typography } from '@mui/material';
import ImageCropper from '@/components/ImageCropper';
import CollectionChangeData from './CollectionChangeData';
import { FormattedMessage, useIntl } from 'react-intl';
import { useActions } from '@/hooks/useActions';

function ChangeCollection() {
    const [croppedImage, setCroppedImage] = useState<string | undefined>(undefined);
    const { showSnackbar } = useActions();
    const intl = useIntl();
    const [file, setFile] = useState<File>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            showSnackbar('Please wait, the image must be cropped for successful upload.');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ textAlign: 'center', margin: '20px' }}>
                <FormattedMessage id="Collection_information" />
            </Typography>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%',
                    padding: '20px',
                    borderRadius: '10px',
                    margin: 'auto',
                    marginBottom: '20px',
                    gap: '10px',
                    backgroundColor: 'secondary.dark'
                }}
            >
                <CollectionChangeData croppedImage={croppedImage} file={file} />
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
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px'
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <InputLabel sx={{ margin: '10px 0' }}>
                                <FormattedMessage id="Crop_image_here" />
                            </InputLabel>
                            <ImageCropper
                                file={file}
                                setFile={(file) => setFile(file)}
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
                                <InputLabel sx={{ margin: '10px 0' }}>
                                    <FormattedMessage id="Cropped_collection_image" />
                                </InputLabel>
                                <img
                                    src={croppedImage}
                                    alt={intl.formatMessage({ id: 'Cropped_preview' })}
                                    style={{ borderRadius: '10px', width: '500px', maxWidth: '100%' }}
                                />
                            </Box>
                        )}
                    </Box>
                )}
            </Card>
        </Box>
    );
}

export default ChangeCollection;
