import { Box, Button, CircularProgress, InputLabel, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
    useAddCollectionImageMutation,
    useChangeCollectionMutation,
    useGetCollectionInfoQuery
} from '@/stores/api/collections.api';
import { dataUrlToFile } from '@/utils/cropUtils';
import { variables } from '@/helpers/variables';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useUserState } from '@/hooks/useStoreState';
import { FormattedMessage } from 'react-intl';
import { useActions } from '@/hooks/useActions';

function CollectionChangeData({ croppedImage, file }: { croppedImage: string | undefined; file: File | undefined }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useUserState();
    const { showSnackbar } = useActions();

    const { isLoading: isLoadingGet, data: dataGet } = useGetCollectionInfoQuery(String(id));
    const [addCollectionImage, { isLoading: isLoadingImage, isSuccess: isSuccessImage, data: dataImage }] =
        useAddCollectionImageMutation();
    const [changeCollection, { isLoading: isLoadingCollection, isSuccess: isSuccessCollection }] =
        useChangeCollectionMutation();

    if (!token) {
        return <Navigate to={'/collection/' + id} />;
    }

    const [formDataCollection, setFormDataCollection] = useState({
        title: '',
        description: '',
        theme: ''
    });

    useEffect(() => {
        if (dataGet) {
            setFormDataCollection({
                title: dataGet.title,
                description: dataGet.description || '',
                theme: dataGet.theme
            });
        }
    }, [isLoadingGet]);

    useEffect(() => {
        if (isSuccessImage) {
            changeCollection({
                id: dataGet!.id,
                ...formDataCollection,
                photoPath: dataImage || 'default.jpg',
                creationDate: new Date(),
                items: [],
                collectionFields: undefined
            });
            showSnackbar('Collection_changed_successfully');
        }
    }, [isLoadingImage]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormDataCollection({ ...formDataCollection, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (croppedImage && file) {
            const formDataImage = new FormData();
            let imageFile = await dataUrlToFile(croppedImage, file.name);
            formDataImage.append('file', imageFile, imageFile.name);
            addCollectionImage(formDataImage);
        } else {
            if (dataGet) {
                const collectionData = {
                    id: dataGet.id,
                    ...formDataCollection,
                    photoPath: dataGet.photoPath,
                    creationDate: new Date(),
                    items: [],
                    collectionFields: undefined
                };
                changeCollection(collectionData);
                if (isSuccessCollection) {
                    showSnackbar('Collection_changed_successfully');
                }
            }
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                onClick={() => navigate('/collections/' + dataGet?.id)}
                sx={{ margin: '20px', position: 'fixed', top: 'calc(60px)', left: '0' }}
            >
                <FormattedMessage id="Back_to_collection" />
            </Button>
            <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                component="form"
                className="form-box"
                onSubmit={handleSubmit}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                    {dataGet && (
                        <Box>
                            <InputLabel sx={{ margin: '10px 0', width: '100%' }}>
                                <FormattedMessage id="Current_collection_image" />
                            </InputLabel>
                            <img
                                src={variables.BACKEND_URL + dataGet.photoPath}
                                alt={dataGet.title}
                                style={{ width: '500px', borderRadius: '10px' }}
                            />
                        </Box>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            width: '50%',
                            marginTop: '10px'
                        }}
                    >
                        <InputLabel>
                            <FormattedMessage id="Collection_title" />
                        </InputLabel>
                        <TextField
                            id="title"
                            name="title"
                            type="text"
                            required
                            label={<FormattedMessage id="Title" />}
                            value={formDataCollection.title}
                            onChange={handleChange}
                            inputProps={{ maxLength: 40, minLength: 3 }}
                        />
                        <InputLabel>
                            <FormattedMessage id="Collection_theme" />
                        </InputLabel>
                        <TextField
                            id="theme"
                            name="theme"
                            type="text"
                            required
                            label={<FormattedMessage id="Theme" />}
                            value={formDataCollection.theme}
                            onChange={handleChange}
                            inputProps={{ maxLength: 30, minLength: 3 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            <FormattedMessage id="Creation_date" />
                            {': ' +
                                new Date(dataGet?.creationDate!).toLocaleTimeString().slice(0, 5) +
                                ' ' +
                                new Date().toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>
                <InputLabel sx={{ marginTop: '10px' }}>
                    <FormattedMessage id="Collection_description" />
                </InputLabel>
                <TextField
                    id="description"
                    name="description"
                    type="text"
                    required
                    label={<FormattedMessage id="Description" />}
                    value={formDataCollection.description}
                    onChange={handleChange}
                    multiline
                    inputProps={{ maxLength: 1000 }}
                />
                <Button
                    variant="contained"
                    sx={{ marginTop: '20px', width: '20%', alignSelf: 'center' }}
                    type="submit"
                    disabled={isLoadingCollection || isLoadingImage}
                >
                    {isLoadingCollection ? (
                        <CircularProgress color="inherit" size={25} />
                    ) : (
                        <FormattedMessage id="Save" />
                    )}
                </Button>
            </Box>
        </>
    );
}

export default CollectionChangeData;
