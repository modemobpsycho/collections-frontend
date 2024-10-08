import { ChangeEvent } from 'react';
import { ICollectionFields } from '@/types/collectionFields.interface';
import { Box, Button, Input, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormattedMessage, useIntl } from 'react-intl';

const CollectionFields = ({ fields, setFields }: { fields: ICollectionFields[]; setFields: Function }) => {
    const intl = useIntl();
    const handleAddField = () => {
        setFields([...fields, { id: undefined, fieldType: 'string', fieldName: '' }]);
    };
    const handleChangeFieldType = (event: SelectChangeEvent<string>, id: number) => {
        setFields(
            fields.map((field, index) => {
                if (index === id) field.fieldType = event.target.value as 'string' | 'boolean' | 'Date' | 'number';
                return field;
            })
        );
    };
    const handleChangeFieldName = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
        setFields(
            fields.map((field, index) => {
                if (index === id) field.fieldName = event.currentTarget.value;
                return field;
            })
        );
    };
    const handleRemoveField = (index: number) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };

    return (
        <Box>
            <Button onClick={handleAddField} variant="contained">
                <FormattedMessage id="Add_field" />
            </Button>
            {fields.length > 0 &&
                fields.map((_field, index) => (
                    <Box
                        key={index}
                        style={{
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: '30px'
                        }}
                    >
                        <Select
                            onChange={(event) => handleChangeFieldType(event, index || 0)}
                            id={'fieldSelect' + index}
                            defaultValue="string"
                            sx={{ width: '130px', marginRight: '10px', height: '50px' }}
                            value={_field.fieldType}
                            variant="outlined"
                            required
                        >
                            <MenuItem value="string">
                                <FormattedMessage id="Text" />
                            </MenuItem>
                            <MenuItem value="number">
                                <FormattedMessage id="Number" />
                            </MenuItem>
                            <MenuItem value="Date">
                                <FormattedMessage id="Date" />
                            </MenuItem>
                            <MenuItem value="boolean">
                                <FormattedMessage id="Boolean" />
                            </MenuItem>
                        </Select>
                        <Input
                            type="text"
                            onChange={(event) => handleChangeFieldName(event, index || 0)}
                            placeholder={intl.formatMessage({ id: 'Field_name' })}
                            id={'fieldInput' + index}
                            sx={{ width: '100%', marginRight: '10px', height: '50px' }}
                            required
                            inputProps={{ maxLength: 100 }}
                        />
                        <Button
                            onClick={() => handleRemoveField(index)}
                            sx={{ height: '50px', width: '50px' }}
                            variant="outlined"
                            color="error"
                        >
                            <DeleteIcon />
                        </Button>
                    </Box>
                ))}
        </Box>
    );
};

export default CollectionFields;
