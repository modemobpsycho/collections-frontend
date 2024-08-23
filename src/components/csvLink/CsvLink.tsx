import { ICollection } from '@/types/collection.interface';
import { Box, Button } from '@mui/material';
import { CSVLink } from 'react-csv';
import { FormattedMessage } from 'react-intl';

function CsvLink({ data }: { data: ICollection }) {
    let csvData: any = [];

    if (data && data.items) {
        csvData.push({
            collectionId: data.id,
            collectionTitle: data.title,
            collectionOwnerName: data.user?.fullName,
            collectionOwnerEmail: data.user?.email,
            collectionDescription: data.description,
            collectionTheme: data.theme,
            collectionCreatedAt: data.creationDate
        });

        data.items.forEach((item) => {
            csvData.push({
                itemId: item.id,
                itemName: item.name,
                itemCreatedAt: item.creationDate
            });
        });
    }

    const headers = [
        { label: 'Collection ID', key: 'collectionId' },
        { label: 'Collection Title', key: 'collectionTitle' },
        { label: 'Collection Owner Name', key: 'collectionOwnerName' },
        { label: 'Collection Owner Email', key: 'collectionOwnerEmail' },
        { label: 'Collection Description', key: 'collectionDescription' },
        { label: 'Collection Theme', key: 'collectionTheme' },
        { label: 'Collection Created At', key: 'collectionCreatedAt' },
        { label: 'Item ID', key: 'itemId' },
        { label: 'Item Name', key: 'itemName' },
        { label: 'Item Created At', key: 'itemCreatedAt' }
    ];

    return (
        <Box sx={{ display: 'flex', marginTop: '5px', marginLeft: 'auto' }}>
            <CSVLink data={csvData} headers={headers} filename={data ? data.title + '.csv' : 'collection.csv'}>
                <Button variant="outlined">
                    <FormattedMessage id="Export_to_CSV" />
                </Button>
            </CSVLink>
        </Box>
    );
}

export default CsvLink;
