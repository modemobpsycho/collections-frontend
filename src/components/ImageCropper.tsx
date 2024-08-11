import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface ImageCropperProps {
    imageSrc: string;
    onCrop: (croppedImage: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, onCrop }) => {
    const cropperRef = useRef<HTMLImageElement | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    useEffect(() => {
        if (croppedImage) {
            onCrop(croppedImage);
        }
    }, [croppedImage, onCrop]);

    const handleCrop = () => {
        if (cropperRef.current) {
            const cropper: any = (cropperRef.current as any).cropper;
            cropper.getCroppedCanvas().toBlob((blob: any) => {
                setCroppedImage(URL.createObjectURL(blob));
            });
        }
    };

    return (
        <>
            <Cropper
                ref={cropperRef}
                src={imageSrc}
                style={{ height: 400, maxWidth: '400px' }}
                aspectRatio={16 / 9}
                guides={true}
            />
            <button onClick={handleCrop}>Crop Image</button>
        </>
    );
};

export default ImageCropper;
