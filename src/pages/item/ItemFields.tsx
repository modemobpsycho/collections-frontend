import { IItem } from '@/types/item.interface';
import { Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

function ItemFields({ item }: { item: IItem }) {
    return (
        <Box>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
                {' '}
                <FormattedMessage id="Item_description" />
            </Typography>
            {item.ItemFields?.map((field) => (
                <Box key={field.id}>
                    <Typography variant="body1">
                        {field.fieldName}:{' '}
                        {field.stringFieldValue !== null
                            ? field.stringFieldValue
                            : field.doubleFieldValue !== null
                            ? field.doubleFieldValue
                            : field.dateFieldValue !== null
                            ? new Date(field.dateFieldValue!).toLocaleDateString() +
                              ' ' +
                              new Date(field.dateFieldValue!).toLocaleTimeString().slice(0, 5)
                            : field.boolFieldValue !== null
                            ? field.boolFieldValue!.toString() === 'true'
                                ? 'Yes'
                                : 'No'
                            : 'No value'}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}

export default ItemFields;
