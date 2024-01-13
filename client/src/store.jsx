import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import { persistStore } from 'redux-persist';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
  }),
});

const persistor = persistStore(store);

export { store, persistor };
