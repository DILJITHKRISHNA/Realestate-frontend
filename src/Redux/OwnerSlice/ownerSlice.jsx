import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    id: '',
    username: '',
    password: '',
    email: '',
    mobile: '',
    profileImage: '',
    is_Block: '',
    is_Active: ''

}

export const OwnerSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        setOwnerDetails: (state, action) => {
            state.id = action.payload.id,
            state.username = action.payload.username,
            state.password = action.payload.password
            state.email = action.payload.email
            state.mobile = action.payload.mobile
        },
        setOwnerLogoutDetails: (state) => {
            state.id = ''
            state.username = ''
            state.password = ''
            state.email = ''
            state.mobile = ''
        }

    }
})

export const { setOwnerDetails, setOwnerLogoutDetails } = OwnerSlice.actions
export default OwnerSlice.reducer