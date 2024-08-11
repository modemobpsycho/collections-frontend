//универсальный компонент для вывода коллекции
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { ICollection } from '../../types/collection.interface';

function CollectionCard({ collection }: { collection: ICollection }) {
    return (
        <Card
            sx={{
                marginBottom: '10px',
                width: '50%',
                padding: '10px',
                borderRadius: '10px'
            }}
        >
            <CardContent>
                <Typography variant="h5" component="div">
                    {collection.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {collection.description}
                </Typography>
                <Link to={`/collections/${collection.id}`}>
                    <Button variant="contained" color="primary" sx={{ marginTop: '10px' }}>
                        Посмотреть коллекцию
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}

export default CollectionCard;
