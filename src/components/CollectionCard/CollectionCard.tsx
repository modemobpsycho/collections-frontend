import { Link } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { ICollection } from '@/types/collection.interface';
import { variables } from '@/helpers/variables';
import { marked } from 'marked';

function CollectionCard({ collection }: { collection: ICollection }) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: 'secondary.dark'
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <img
                        src={variables.BACKEND_URL + collection.photoPath}
                        alt={collection.title}
                        style={{ width: '50%', borderRadius: '10px' }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
                        <Typography variant="h5" sx={{ textAlign: 'center', lineHeight: '1.1' }}>
                            {collection.title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{ marginBottom: '10px', marginTop: '10px', textAlign: 'center' }}
                        >
                            {collection.theme}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {new Date(collection.creationDate).toLocaleString()}
                        </Typography>
                    </Box>
                </Box>
                {collection.description && collection.description?.trim() != '' && (
                    <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{ marginTop: '10px' }}
                        dangerouslySetInnerHTML={{ __html: marked.parse(collection.description) }}
                    ></Typography>
                )}
            </CardContent>

            <Button variant="contained" color="primary" sx={{ margin: 'auto 10px 10px', alignSelf: 'flex-end' }}>
                <Link to={`/collections/${collection.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                    Посмотреть коллекцию
                </Link>
            </Button>
        </Card>
    );
}

export default CollectionCard;
