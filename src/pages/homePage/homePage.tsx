import { Box, Typography } from '@mui/material';
import './homePage.scss';

const collectionsData = [
    {
        id: 1,
        title: 'Funko Pop Figures',
        owner: 'John Doe',
        description: 'Collection of rare Funko Pop figures.',
        imageUrl: 'https://example.com/funko.jpg'
    },
    {
        id: 2,
        title: 'Vintage Stamp Collection',
        owner: 'Alice Smith',
        description: 'Explore a vintage stamp collection.',
        imageUrl: 'https://example.com/stamps.jpg'
    },
    {
        id: 3,
        title: 'Classic Vinyl Records',
        owner: 'Emily Johnson',
        description: 'Collection of classic vinyl records.',
        imageUrl: 'https://example.com/records.jpg'
    },
    {
        id: 4,
        title: 'Classic Vinyl Records',
        owner: 'Emily Johnson',
        description: 'Collection of classic vinyl records.',
        imageUrl: 'https://example.com/records.jpg'
    }
];

const HomePage = () => {
    return (
        <Box className="home-page">
            <Typography variant="h1">Welcome to Our Collections</Typography>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                Explore unique collections from our users.
            </Typography>

            <Box className="collection-cards">
                {collectionsData.map((collection) => (
                    <Box key={collection.id} className="collection-card">
                        <img src={collection.imageUrl} alt={collection.title} />
                        <Typography variant="h5">{collection.title}</Typography>
                        <Typography variant="subtitle1">Owner: {collection.owner}</Typography>
                        <Typography variant="subtitle1">{collection.description}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default HomePage;
