import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {email: "", token: ""};

export const accountSlice = createSlice({
    name: "account",
    initialState: {
        login_state: initialStateValue,
        wallet_account: [],
        isLogin: false
    },
    reducers:{
        setUser:(state, action)=>{
            state.login_state=action.payload;
            state.isLogin = true;
        },
        removeUser:(state)=>{
            state.isLogin = false;
            state.value = initialStateValue;
        },
        setWallet: (state, action)=>{
            state.wallet_account = action.payload
        },
        addWallet: (state, action)=>{
            state.wallet_account.push(action.payload)
        }
    }
});

export const {setUser, removeUser, setWallet, addWallet} = accountSlice.actions;

export default accountSlice.reducer;