import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
   OwnerInfo: {}

}

export const OwnerSlice = createSlice({
    name: 'owner',
    initialState: INITIAL_STATE,
    reducers: {
        setOwnerDetails: (state, action) => {
            state.OwnerInfo = action.payload;
            console.log(action.payload)
        },
        resetState: (state) => {
            return INITIAL_STATE;
        }

    }
})

export const { setOwnerDetails, resetState } = OwnerSlice.actions
export default OwnerSlice.reducer