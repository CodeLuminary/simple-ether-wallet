import {configureStore} from "@reduxjs/toolkit";
import accountReducer from "./reducers/accountReducer";

export default configureStore({
    reducer:{
        account: accountReducer
    }
})