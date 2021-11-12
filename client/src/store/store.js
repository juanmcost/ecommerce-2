import { configureStore } from "@reduxjs/toolkit"; // import redux tool-kit
import logger from 'redux-logger' // import redux logger
import authReducer from './auth'
import userReducer from './user'
import productReducer from './product'


// config reducer

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
      auth: authReducer,
      user: userReducer,
      product: productReducer,
    },
  });
  
  export default store; 