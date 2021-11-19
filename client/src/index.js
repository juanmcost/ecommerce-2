import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const theme = extendTheme({
    components: { Button: { baseStyle: { _focus: { boxShadow: 'none' } } } },
});

let persistor = persistStore(store);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ChakraProvider theme={theme}>
                    <App />
                </ChakraProvider>
            </PersistGate>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
