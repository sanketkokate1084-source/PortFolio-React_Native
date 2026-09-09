import {Tuple, configureStore, createListenerMiddleware} from '@reduxjs/toolkit';
import {rootReducer} from '../slices/rootReducer';
import type {Middleware} from '@reduxjs/toolkit';
import {logger} from 'redux-logger';
import {reduxPersistStorage} from '@/localStorage/localStorageMain';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from 'redux-persist';

const middlewares: Middleware[] = [];

export const mainListener = createListenerMiddleware();

const persistConfig ={
  key: 'rootState',
  storage: reduxPersistStorage,
  whitelist: ['preferrenceReducer'], //only 'preferrenceReducer' from rootReducer will be persisted.
};

const persistedReducer = persistReducer( persistConfig, rootReducer); //part of redux-persist (to store the redux-state locally)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck:{ignoredActions : [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE]}}).prepend(mainListener.middleware).concat(...middlewares),
});

export default store;

const persistor = persistStore(store);

export {persistor}; //persistor object can be used to start or stop store from persisting store. //persisting as in storing it locally.
