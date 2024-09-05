import { variables } from '@/helpers/variables';
import { useGetTicketsQuery } from '@/stores/api/jira.api';
import { Box, Card, CircularProgress, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function Support() {
    const [ticketsLimit, setTicketsLimit] = useState(variables.TICKETS_MIN);
    const { data: tickets, isLoading: isLoadingTickets } = useGetTicketsQuery(ticketsLimit);

    const handleLoadMore = () => {
        if (ticketsLimit + variables.TICKETS_INC <= variables.TICKETS_MAX) {
            setTicketsLimit(ticketsLimit + variables.TICKETS_INC);
        }
    };

    const handleResetTickets = () => {
        setTicketsLimit(variables.TICKETS_MIN);
    };

    return (
        <Box sx={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
            <Card
                sx={{
                    display: 'flex',
                    width: '50%',
                    padding: '10px',
                    flexDirection: 'column',
                    gap: '10px',
                    backgroundColor: 'secondary.dark'
                }}
            >
                <Typography variant="h4" sx={{ margin: '20px auto' }}>
                    <FormattedMessage id="Support" />
                </Typography>
                {isLoadingTickets ? (
                    <CircularProgress sx={{ margin: 'auto' }} />
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {tickets &&
                            tickets.map((ticket) => (
                                <Card
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '5px',
                                        padding: '10px',
                                        width: '100%',
                                        borderRadius: '10px'
                                    }}
                                    key={ticket.id}
                                >
                                    <Box
                                        sx={{ display: 'flex', gap: '5px', alignItems: 'center', marginBottom: '5px' }}
                                    >
                                        <img src={ticket.issueIconUrl} alt={ticket.summary} width={30} />
                                        <Typography sx={{ fontSize: '20px' }}> {ticket.issueType}</Typography>
                                        <Box sx={{ display: 'flex', gap: '5px', marginLeft: 'auto' }}>
                                            <img src={ticket.priorityIconUrl} alt={ticket.priority} width={30} />{' '}
                                            <Typography sx={{ fontSize: '20px' }}>{ticket.priority} </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: '10px' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '18px',
                                                wordWrap: 'break-word'
                                            }}
                                        >
                                            {ticket.summary}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontSize: '16px',
                                            wordWrap: 'break-word'
                                        }}
                                    >
                                        {ticket.description}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                        <Typography variant="subtitle2" sx={{ fontSize: '16px' }}>
                                            <FormattedMessage id="Status" />: {ticket.status}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ marginLeft: 'auto' }}>
                                            {ticket.created && new Date(ticket.created).toLocaleTimeString()}{' '}
                                            {ticket.created && new Date(ticket.created).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </Card>
                            ))}
                    </Box>
                )}

                {tickets && tickets.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        {ticketsLimit <= variables.TICKETS_MAX && (
                            <IconButton sx={{ marginTop: '20px' }} onClick={handleLoadMore}>
                                <ExpandMoreIcon color="primary" sx={{ fontSize: '40px' }} />
                            </IconButton>
                        )}
                        {ticketsLimit > variables.TICKETS_MIN && (
                            <IconButton sx={{ marginTop: '20px' }} onClick={handleResetTickets}>
                                <ExpandLessIcon color="primary" sx={{ fontSize: '40px' }} />
                            </IconButton>
                        )}
                    </Box>
                )}

                {tickets && tickets.length === 0 && (
                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                        {isLoadingTickets ? (
                            <CircularProgress />
                        ) : (
                            <FormattedMessage id="You_have_not_yet_contacted_support" />
                        )}
                    </Typography>
                )}
            </Card>
        </Box>
    );
}

export default Support;
