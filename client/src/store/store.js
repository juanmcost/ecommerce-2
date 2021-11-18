import { configureStore } from "@reduxjs/toolkit"; // import redux tool-kit
import {
      persistReducer,
      FLUSH,
      REHYDRATE,
      PAUSE,
      PERSIST,
      PURGE,
      REGISTER,
    } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger' // import redux logger
import authReducer from './auth'
import userReducer from './user'
import productReducer from './product'
import reviewReducer from './review'
import orderReducer from './order';
import totalReducer from './total';

const persistConfig = {
      key: 'root',
      version: 1,
      storage,
}

const persistedOrderReducer = persistReducer(persistConfig, orderReducer);

/* const persistedTotalReducer = persistReducer(persistConfig, totalReducer) */

const store = configureStore({
      reducer: {
            auth: authReducer,
            user: userReducer,
            product: productReducer,
            order: persistedOrderReducer,
            /* total: persistedTotalReducer, */
            review: reviewReducer,
      },
      middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
            serializableCheck: {
                  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                  },
            }),
})

export default store; 
