import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {email: "", user_name:"", token: "",id:0};

export const accountSlice = createSlice({
    name: "account",
    initialState: {
        login_state: initialStateValue,
        wallet_account: []
    },
    reducers:{
        loginUser:(state, action)=>{
            state.login_state=action.payload;
            state.isLogin = true;
        },
        logoutUser:(state)=>{
            state.isLogin = false;
            state.value = initialStateValue;
        }
    }
});

export const {loginUser, logoutUser} = accountSlice.actions;

export default accountSlice.reducer;