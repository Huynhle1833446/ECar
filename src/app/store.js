import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import { authApi } from "../services/authApi";
import {ticketApi} from "../services/ticketApi"
import locationReducer from "../features/ticket/locationSlice"
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer : {
        auth : authReducer,
        location : locationReducer,

        [ticketApi.reducerPath] : ticketApi.reducer,
        [authApi.reducerPath] : authApi.reducer     
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authApi.middleware)
                        .concat(ticketApi.middleware)
})
export default store
setupListeners(store.dispatch);