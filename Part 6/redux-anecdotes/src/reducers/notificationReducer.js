import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notifyVote(state, action) {
            state = `you voted '${action.payload}'`
            return state;
        },
        notifyCreation(state, action) {
            state = `anecdote '${action.payload}' created`
            return state;
        },
        notifyClear(state) {
            console.log({state})
            state = null;
            return state;
        }
    }
})

export const { notifyVote, notifyCreation, notifyClear } = notificationSlice.actions;
export default notificationSlice.reducer