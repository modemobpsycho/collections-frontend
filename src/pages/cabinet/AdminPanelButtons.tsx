import { useDeleteUserMutation, useUpdateUserAdminMutation } from '@/stores/api/user.api';
import { IUserUpdateAdminInfo } from '@/types/user.interface';
import { Box, Button, CircularProgress } from '@mui/material';
import { FormattedMessage } from 'react-intl';

function AdminPanelButtons({
    currentUser,
    setCurrentUser
}: {
    currentUser: IUserUpdateAdminInfo;
    setCurrentUser: Function;
}) {
    const [updateUserAdmin, { isLoading: isLoadingUpdate }] = useUpdateUserAdminMutation();
    const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
    const handleSubmit = async () => {
        try {
            if (currentUser) {
                updateUserAdmin({
                    id: currentUser.id,
                    email: currentUser.email,
                    fullName: currentUser.fullName,
                    role: currentUser.role,
                    access: Boolean(currentUser.access),
                    password: currentUser.password
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUser(currentUser);
            setCurrentUser({
                id: 0,
                email: '',
                fullName: '',
                role: 0,
                access: true,
                password: ''
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Box sx={{ display: 'flex', gap: '10px', padding: '10px' }}>
            <Button type="button" variant="contained" onClick={handleSubmit} disabled={currentUser.id === 0}>
                {isLoadingUpdate ? <CircularProgress size={25} /> : <FormattedMessage id="Change_user_data" />}
            </Button>
            <Button
                type="button"
                variant="contained"
                color="error"
                sx={{ backgroundColor: 'red', marginLeft: 'auto' }}
                onClick={handleDelete}
                disabled={currentUser.id === 0}
            >
                {isLoadingDelete ? <CircularProgress size={25} /> : <FormattedMessage id="Delete_user" />}
            </Button>
        </Box>
    );
}

export default AdminPanelButtons;
