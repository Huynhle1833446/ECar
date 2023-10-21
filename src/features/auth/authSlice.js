import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {},
    success: false,
    isLogin: false
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            let dataTemp = {
                username : action.payload.username,
                password : action.payload.password,
                phone : action.payload.phone,
                token : action.payload.token,
                role : action.payload.role
            }
            return {
                ...state,
                isLogin: true,
                success: true,
                userInfo: dataTemp
            }
        }
    },
    extraReducers: {}
})

export const selectAuth = (state) => state.auth;
export const { setUser } = authSlice.actions
export default authSlice.reducer



