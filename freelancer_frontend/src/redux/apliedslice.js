import { createSlice } from "@reduxjs/toolkit";
const Apliedslice = createSlice({
    name:'aplied',
    initialState:{
        appliedjobs:[]
    },
    reducers:{
        applied(state,action){
            state.appliedjobs = action.payload.data
        }
    }
})

export const Applyaction = Apliedslice.actions

export default Apliedslice