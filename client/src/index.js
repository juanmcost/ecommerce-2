import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
const theme = extendTheme({ components: { Button: { baseStyle: { _focus: { boxShadow: 'none' } } } } });

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
