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
    })
})

export const {useLoginMutation, useRegisterMutation, useSendOTPMutation, useVerifyOtpMutation} = authApi;


// export function useLogin() {
//     return useMutation((params) =>
//         fetch(linkApi.COM_URL + '/api/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(params)
//         })
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error('Network response was not ok')
//                 }
//                 return res.json()
//             })
//             .catch((error) => {
//                 console.log("error",error)
//             })

//     );
// }
// export const login = async (username,password) => {
//     return new Promise((resolve,reject) => {
//         try {
//             axios.post(`${linkApi.COM_URL}/api/auth/login`,{username,password})
//             .then(res => {
//                 resolve(res.data)
//             })
//             .catch(err => {
//                 reject(err)
//             })
//         } catch (error) {
//             reject(err)
//         }
//     })
// }
// export const sendOTP = async (phone) => {
//     return new Promise((resolve,reject) => {
//         try {
//             axios.post(`${linkApi.COM_URL}/api/auth/send-otp`,{phone})
//             .then(res => {
//                 resolve(res.data)
//             })
//             .catch(err => {
//                 reject(err)
//             })
//         } catch (error) {
//             reject(err)
//         }
//     })
// }

// export const verifyOtp = async (phone,otp) => {
//     return new Promise((resolve,reject) => {
//         try {
//             axios.post(`${linkApi.COM_URL}/api/auth/verify-otp`,{phone,otp})
//             .then(res => {
//                 resolve(res.data)
//             })
//             .catch(err => {
//                 reject(err)
//             })
//         } catch (error) {
//             reject(err)
//         }
//     })
// }

// export const register = async (data) => {
//     return new Promise((resolve,reject) => {
//         try {
//             axios.post(`${linkApi.COM_URL}/api/auth/register`,{fullname : data.fullname, username : data.username, password : data.password, phone : data.phone})
//             .then(res => {
//                 resolve(res.data)
//             })
//             .catch(err => {
//                 reject(err)
//             })
//         } catch (error) {
//             reject(err)
//         }
//     })
// }


