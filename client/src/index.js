import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
const theme = extendTheme({ components: { Button: { baseStyle: { _focus: { boxShadow: 'none' } } } } });

ReactDOM.render(
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>,

    document.getElementById('root')
);
