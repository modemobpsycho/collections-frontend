import { useState } from 'react';
import { Box, Button, Card, InputLabel, Typography } from '@mui/material';
import ImageCropper from '@/components/ImageCropper';
import CollectionChangeData from './CollectionChangeData';

function ChangeCollection() {
    const [croppedImage, setCroppedImage] = useState<string | undefined>(undefined);

    const [file, setFile] = useState<File>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ textAlign: 'center', margin: '20px' }}>
                COLLECTION INFO
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
                        <Typography variant="subtitle2">Upload image</Typography>
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
                            <InputLabel sx={{ margin: '10px 0' }}>Crop image here</InputLabel>
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
                                <InputLabel sx={{ margin: '10px 0' }}>Cropped collection image</InputLabel>
                                <img
                                    src={croppedImage}
                                    alt="Cropped Preview"
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
