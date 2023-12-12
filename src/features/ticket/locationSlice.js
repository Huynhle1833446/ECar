import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locationFrom: [],
    locationTo: [],
    chosenRoute: [],
    finishedRoute: [],
    ticketBooked : [],
    availableRoute : [],
    listUserInTrip : []
}
const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocationFrom: (state, action) => {
            state.locationFrom = action.payload
        },
        setLocationTo: (state, action) => {
            state.locationTo = action.payload
        },
        setChosenRoute: (state, action) => {
            state.chosenRoute = action.payload
        },
        setFinishedRoute: (state, action) => {
            state.finishedRoute = action.payload
        },
        setTicketBooked : (state,action) => {
            state.ticketBooked = action.payload
        },
        removeTicket: (state,action) => {
          state.ticketBooked = state.ticketBooked.filter(item => item.ticket_id !== action.payload)  
        },
        setAvailableRoute : (state,action) => {
            state.availableRoute = action.payload
        },
        setListUserInTrip : (state,action) => {
            state.listUserInTrip = action.payload
        }
    }
})

export const selectLocation = (state) => state.location;
export const { setLocationFrom, setLocationTo, setChosenRoute, setFinishedRoute,setTicketBooked,setAvailableRoute,setListUserInTrip, removeTicket } = locationSlice.actions
export default locationSlice.reducer

