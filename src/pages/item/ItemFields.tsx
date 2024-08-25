import { IItem } from '@/types/item.interface';
import { Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

function ItemFields({ item }: { item: IItem }) {
    return (
        <>
            {item && item.ItemFields && item.ItemFields.length > 0 && (
                <Box>
                    <Typography variant="h5" sx={{ textAlign: 'center', marginTop: '10px' }}>
                        <FormattedMessage id="Item_description" />
                    </Typography>
                    {item.ItemFields?.map((field) => (
                        <Box key={field.id}>
                            <Typography variant="body1">
                                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
                                    {field.fieldName}
                                </Typography>
                                {': '}
                                <Typography variant="subtitle1" component="span">
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
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </>
    );
}

export default ItemFields;
