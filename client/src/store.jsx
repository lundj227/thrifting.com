import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer'; // Import your root reducer
import { persistStore } from 'redux-persist';

// Configure and create the Redux store
const store = configureStore({
  reducer: rootReducer, // Use your root reducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Initialize Redux Persist to persist the store data
const persistor = persistStore(store);

export { store, persistor };
