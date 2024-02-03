import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
  adminInfo: {}
}

export const AdminSlice = createSlice({
    name: 'admin',
    initialState: INITIAL_STATE,
    reducers: {
        setAdminDetails: (state, action) => {
            state.adminInfo = action.payload;
            console.log(action.payload)
        },
        resetState: (state) => {
            return INITIAL_STATE;
        }

    }
})

export const { setAdminDetails, resetState } = AdminSlice.actions
export default AdminSlice.reducer