import FocusLock from 'react-focus-lock';
import {
    FormControl,
    FormLabel,
    ButtonGroup,
    IconButton,
    Button,
    EditIcon,
    Stack,
    Box,
    Input,
} from '@chakra-ui/react';
import React from 'react';

const InputPopOver = () => {
    return (
        <Box w="full" h="80px">
            <Input variant="flushed" placeholder="Image URL" />
        </Box>
    );
};

export default InputPopOver;
