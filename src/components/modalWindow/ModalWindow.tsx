import { Box, Typography, Modal } from '@mui/material';
import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    gap: '10px',
    p: 4
};

function ModalWindow({
    children,
    open,
    onClose
}: {
    children: ReactElement[] | ReactElement;
    open: boolean;
    onClose: () => void;
}) {
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
                        <FormattedMessage id="Support" />
                    </Typography>
                    {children}
                </Box>
            </Modal>
        </>
    );
}

export default ModalWindow;
