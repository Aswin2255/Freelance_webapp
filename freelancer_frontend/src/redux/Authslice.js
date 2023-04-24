import { createSlice } from "@reduxjs/toolkit";
const Authslice = createSlice({
    name : 'Auth',
    initialState:{
       role : 'guest',
       logedin:false,
       username : null,
       token : null
    },
    reducers:{
        Userlogin(state,action){
            state.logedin = true
            state.role = action.payload.userfind[0].role
            state.username = action.payload.userfind[0].username
            state.token = action.payload.token
        },
        Userlogout(state,action){
            state.logedin = false
            state.role = 'guest'
            state.username = null
            state.token = null

        }
    }

})

export const Authaction = Authslice.actions;

export default Authslice;