import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice/userSlice.jsx'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

