import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locationFrom: [],
    locationTo: [],
    chosenRoute: [],
    finishedRoute: [],
    ticketBooked : []
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
        }
    }
})

export const selectLocation = (state) => state.location;
export const { setLocationFrom, setLocationTo, setChosenRoute, setFinishedRoute,setTicketBooked } = locationSlice.actions
export default locationSlice.reducer

