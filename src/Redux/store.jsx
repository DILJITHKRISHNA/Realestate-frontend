import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice/userSlice.jsx'
import ownerReducer from './OwnerSlice/ownerSlice.jsx'
import adminReducer from './AdminSlice/adminSlice.jsx'

export const store = configureStore({
  reducer: {
    user: userReducer,
    owner: ownerReducer,
    admin: adminReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

