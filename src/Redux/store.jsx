import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice/userSlice.jsx'
import ownerReducer from './OwnerSlice/ownerSlice.jsx'

export const store = configureStore({
  reducer: {
    user: userReducer,
    owner: ownerReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

