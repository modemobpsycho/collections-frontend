import { IUser } from '@/types/user.interface';
import { Box, Card, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

function AdminPanelUsers({ data, setCurrentUser }: { data: IUser[] | undefined; setCurrentUser: Function }) {
    return (
        <>
            <Typography variant="h4" sx={{ textAlign: 'center', margin: '20px auto' }}>
                <FormattedMessage id="User_management" />
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px',
                    overflowY: 'auto',
                    height: '320px',
                    borderRadius: '10px',
                    gap: '10px',

                    scrollbarColor: (theme) => `${theme.palette.secondary.light} ${theme.palette.secondary.dark}`
                }}
            >
                {data?.map((user) => (
                    <Card
                        sx={{
                            display: 'flex',
                            flexShrink: 0,
                            padding: '10px',
                            borderRadius: '10px',
                            height: '90px',
                            backgroundColor: 'secondary.dark',
                            gap: '10px',
                            cursor: 'pointer'
                        }}
                        onClick={() => setCurrentUser(user)}
                        key={user.id}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Typography variant="h6">{user.email}</Typography>
                            <Typography variant="h6">{user.fullName}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: 'auto' }}>
                            <Typography variant="h6">
                                <FormattedMessage id="Role" />:{' '}
                                {user.role === 1 ? <FormattedMessage id="Admin" /> : <FormattedMessage id="User" />}
                            </Typography>
                            <Typography variant="h6">
                                <FormattedMessage id="Access" />:{' '}
                                {user.access ? <FormattedMessage id="Active" /> : <FormattedMessage id="Blocked" />}
                            </Typography>
                        </Box>
                    </Card>
                ))}
            </Box>
        </>
    );
}

export default AdminPanelUsers;
