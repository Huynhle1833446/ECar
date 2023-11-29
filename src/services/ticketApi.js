import linkApi from "./linkApi";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ticketApi = createApi({
    reducerPath: 'ticketApi',
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
        getLocation: builder.mutation({
            query: (body) => {
                return {
                    url: '/api/location',
                    method: "post",
                    body
                }
            }
        }),
        getRoute : builder.mutation({
            query : (body) => {
                return {
                    url : '/api/trip/getByParams',
                    method : "post",
                    body
                }
            }
        }),
        bookingTicket : builder.mutation({
            query : (body) => {
                return {
                    url : '/api/ticket/create',
                    method : "post",
                    body
                }
            }
        }),
        getTrips : builder.mutation({
            query : (body) => {
                return {
                    url : '/api/trip/getTripByDriver',
                    method : "post",
                    body
                }
            }
        }),
        updateTrip : builder.mutation({
            query : (body) => {
                return {
                    url : '/api/trip/updateStatus',
                    method : "post",
                    body
                }
            }
        }),
        getTicketBooked : builder.mutation({
            query : (body) => {
                return {
                    url : '/api/ticket/myself',
                    method : "post",
                    body
                }
            }
        }),
        getUserInTrip : builder.mutation({
            query : (body) => {
                return {
                    url : '/api/trip/customer/info',
                    method : "post",
                    body
                }
            }
        }) 
    })
})
export const { useGetLocationMutation,useGetRouteMutation,useBookingTicketMutation,useGetTripsMutation,useUpdateTripMutation,useGetTicketBookedMutation,useGetUserInTripMutation } = ticketApi