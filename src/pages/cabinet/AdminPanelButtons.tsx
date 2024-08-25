import { useActions } from '@/hooks/useActions';
import { useDeleteUserMutation, useUpdateUserAdminMutation } from '@/stores/api/user.api';
import { IUser, IUserUpdateAdminInfo } from '@/types/user.interface';
import { Box, Button, CircularProgress } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

function AdminPanelButtons({
    currentUser,
    setCurrentUser,
    user
}: {
    currentUser: IUserUpdateAdminInfo;
    setCurrentUser: Function;
    user: IUser | undefined;
}) {
    const { showSnackbar, logout } = useActions();
    const navigate = useNavigate();
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
                console.log(currentUser);
                if (currentUser.id === user?.id) {
                    if (Boolean(currentUser.access) === false) {
                        logout();
                        showSnackbar('You_have_been_blocked');
                    }
                    if (currentUser.role === 0) {
                        showSnackbar('You_have_been_deleted_from_administration');
                        navigate('/cabinet');
                    }
                }
                showSnackbar('User_updated_successfully');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            if (currentUser) {
                await deleteUser(currentUser);
                setCurrentUser({
                    id: 0,
                    email: '',
                    fullName: '',
                    role: 0,
                    access: true,
                    password: ''
                });
                showSnackbar('User_deleted_successfully');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: '10px', padding: '10px' }}>
            <Button
                type="button"
                variant="contained"
                onClick={handleSubmit}
                disabled={currentUser.id === 0 || isLoadingUpdate}
            >
                {isLoadingUpdate ? <CircularProgress size={25} /> : <FormattedMessage id="Change_user_data" />}
            </Button>
            <Button
                type="button"
                variant="contained"
                color="error"
                sx={{ backgroundColor: 'red', marginLeft: 'auto' }}
                onClick={handleDelete}
                disabled={currentUser.id === 0 || isLoadingDelete}
            >
                {isLoadingDelete ? <CircularProgress size={25} /> : <FormattedMessage id="Delete_user" />}
            </Button>
        </Box>
    );
}

export default AdminPanelButtons;
