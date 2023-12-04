import linkApi from "./linkApi";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
    reducerPath : 'authApi',
    baseQuery : fetchBaseQuery({
        baseUrl : linkApi.COM_URL
    }),
    endpoints : (builder) => ({
        login : builder.mutation({
            query : (body) => {
                return {
                    url : '/api/auth/login',
                    method : "post",
                    body
                }
            }
        }),
        register : builder.mutation({
            query : (body) => {
                return {
                    url : '/api/auth/register',
                    method : "post",
                    body
                }
            }
        }),
        sendOTP : builder.mutation({
            query : (body) => {
                return {
                    url : '/api/auth/send-otp',
                    method : "post",
                    body
                }
            }
        }),
        verifyOtp : builder.mutation({
            query : (body) => {
                return {
                    url : '/api/auth/verify-otp',
                    method : "post",
                    body
                }
            }
        }),
        changePassword : builder.mutation({
            query : (body) => {
                return {
                    url : '/api/auth/change-password',
                    method : "post",
                    body
                }
            }
        })
    })
})

export const {useLoginMutation, useRegisterMutation, useSendOTPMutation, useVerifyOtpMutation, useChangePasswordMutation} = authApi;


