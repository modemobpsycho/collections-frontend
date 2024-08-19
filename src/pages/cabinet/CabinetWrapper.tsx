import { Box, Button, CircularProgress } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation, useGetUserQuery } from '@/stores/api/user.api';
import { ReactElement } from 'react';
import { useActions } from '@/hooks/useActions';
import { useUserState } from '@/hooks/useStoreState';

function CabinetWrapper({ children }: { children: ReactElement[] | ReactElement }) {
    const navigate = useNavigate();
    const { logout } = useActions();
    const { token } = useUserState();
    const { data: user } = useGetUserQuery();
    const [deleteUser, { isLoading: isLoadingDelete, isSuccess: isSuccessDelete }] = useDeleteUserMutation();

    const handleDelete = async () => {
        if (user) {
            try {
                await deleteUser(user);
                logout();
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (!token) {
        navigate('/login');
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    width: 'auto',
                    height: '85%',
                    marginLeft: '10px',
                    position: 'fixed'
                }}
            >
                {user && user.role === 1 && (
                    <Button variant="contained" onClick={() => navigate('/admin-panel')}>
                        <FormattedMessage id="Admin_panel" />
                    </Button>
                )}
                <Button variant="contained" onClick={() => navigate('/cabinet')}>
                    <FormattedMessage id="My_data" />
                </Button>
                <Button variant="contained" onClick={() => navigate('/my-collections')}>
                    <FormattedMessage id="My_collections" />
                </Button>
                <Button variant="contained">
                    <FormattedMessage id="My_comments" />
                </Button>
                <Button variant="contained">
                    <FormattedMessage id="My_reactions" />
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete}>
                    {isLoadingDelete ? <CircularProgress size={25} /> : <FormattedMessage id="Delete_account" />}
                </Button>
            </Box>
            <Box sx={{ marginLeft: '20px', marginTop: '20px' }}>{children}</Box>
        </Box>
    );
}

export default CabinetWrapper;
