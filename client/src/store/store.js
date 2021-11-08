import { configureStore } from "@reduxjs/toolkit"; // import redux tool-kit
import logger from 'redux-logger' // import redux logger


// config reducer

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
    },
  });
  
  export default store; 