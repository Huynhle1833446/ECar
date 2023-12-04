import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import { authApi } from "../services/authApi";
import {ticketApi} from "../services/ticketApi"
import {userApi} from "../services/userApi"
import locationReducer from "../features/ticket/locationSlice"
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer : {
        auth : authReducer,
        location : locationReducer,

        [ticketApi.reducerPath] : ticketApi.reducer,
        [userApi.reducerPath] : userApi.reducer,
        [authApi.reducerPath] : authApi.reducer     
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authApi.middleware)
                        .concat(ticketApi.middleware)
                        .concat(userApi.middleware)
})
export default store
setupListeners(store.dispatch);