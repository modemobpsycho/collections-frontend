import { useGetTicketsQuery } from '@/stores/api/jira.api';
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

function Support() {
    const [ticketsLimit, setTicketsLimit] = useState(10);
    const { data: tickets, isLoading: isLoadingTickets } = useGetTicketsQuery(ticketsLimit);
    console.log(tickets);
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
                    Support
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
            </Card>
        </Box>
    );
}

export default Support;
