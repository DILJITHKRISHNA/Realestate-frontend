import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './UserSlice/userSlice';
import ownerSlice from './OwnerSlice/ownerSlice';
import adminSlice from './AdminSlice/adminSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = {
  user: persistReducer(persistConfig, userSlice),
  owner: persistReducer(persistConfig, ownerSlice),
  admin: persistReducer(persistConfig, adminSlice),
};

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };
