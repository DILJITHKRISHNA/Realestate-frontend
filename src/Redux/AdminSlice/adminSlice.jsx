import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    id: '',
    username: '',
    password: '',
    email: '',
    mobile: '',
    profileImage: '',
    is_Block: '',
    is_Active: '',
    is_Admin: ''

}

export const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminDetails: (state, action) => {
            state.id = action.payload.id,
            state.username = action.payload.username,
            state.password = action.payload.password
            state.email = action.payload.email
            state.mobile = action.payload.mobile
        },
        setAdminLogoutDetails: (state) => {
            state.id = ''
            state.username = ''
            state.password = ''
            state.email = ''
            state.mobile = ''
        }

    }
})

export const { setAdminDetails, setAdminLogoutDetails } = AdminSlice.actions
export default AdminSlice.reducer