import { useSnackbarState } from '@/hooks/useStoreState';
import { IconButton, Snackbar, SxProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useActions } from '@/hooks/useActions';
import { FormattedMessage } from 'react-intl';

const style: SxProps = {
    backgroundColor: 'white',
    color: 'black'
};

function MySnackbar() {
    const { text, isOpen } = useSnackbarState();
    const { closeSnackbar } = useActions();

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={() => closeSnackbar()}
            message={<FormattedMessage id={text} />}
            ContentProps={{ sx: style }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={() => closeSnackbar()}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        />
    );
}

export default MySnackbar;
