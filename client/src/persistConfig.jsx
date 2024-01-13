import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use local storage as the storage engine

const persistConfig = {
  key: 'root', // Key for the storage
  storage, // Use local storage
  whitelist: ['cart'], // Specify which reducers you want to persist
};
