import { SetStateAction, useCallback, useRef } from 'react';
import Cropper from 'react-cropper';
import { Box, Button } from '@mui/material';

import 'cropperjs/dist/cropper.css';
import { FormattedMessage } from 'react-intl';

interface ImageCropperProps {
    file: File | undefined;
    setFile: (file: SetStateAction<File | undefined>) => void;
    croppedImage: string | undefined;
    setCroppedImage: (croppedImage: string | undefined) => void;
}

const ImageCropper = ({ file, setFile, croppedImage, setCroppedImage }: ImageCropperProps) => {
    const cropperRef = useRef<HTMLImageElement | null>(null);

    const handleCrop = useCallback(() => {
        if (cropperRef.current) {
            const cropper: any = (cropperRef.current as any).cropper;
            cropper.getCroppedCanvas().toBlob((blob: any) => {
                setCroppedImage(URL.createObjectURL(blob));
            });
        }
    }, [cropperRef]);

    const handleCancel = () => {
        if (croppedImage || file) {
            setFile(() => undefined);
            setCroppedImage(undefined);
        }
    };

    return (
        <>
            <Cropper
                ref={cropperRef}
                src={URL.createObjectURL(file as Blob)}
                aspectRatio={16 / 9}
                guides={true}
                style={{ width: '400px', maxHeight: '600px' }}
                zoomable={false}
                scalable={false}
                movable={false}
            />
            <Box style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <Button variant="contained" onClick={handleCrop} sx={{ marginTop: '10px' }}>
                    <FormattedMessage id="Crop_image" />
                </Button>
                <Button variant="contained" color="error" sx={{ marginTop: '10px' }} onClick={handleCancel}>
                    <FormattedMessage id="Cancel_upload" />
                </Button>
            </Box>
        </>
    );
};

export default ImageCropper;
