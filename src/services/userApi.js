import linkApi from "./linkApi";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: linkApi.COM_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState().auth.userInfo['token'])
            if (token) {
                headers.set('Authorization', `${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        changePassword : builder.mutation({
            query : (body) => {
                return {
                    url : '/api/auth/change-password',
                    method : "put",
                    body
                }
            }
        }),
        edit: builder.mutation({
            query : (body) => {
                return {
                    url : '/api/user/edit',
                    method : "post",
                    body
                }
            }
        })
    })
})
export const { useChangePasswordMutation, useEditMutation } = userApi