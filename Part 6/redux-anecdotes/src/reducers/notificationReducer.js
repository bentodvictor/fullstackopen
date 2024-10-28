import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notifyTrigger(state, action) {
      state = action.payload;
      return state;
    },
    notifyClear(state) {
      state = null;
      return state;
    },
  },
});

export const { notifyVote, notifyCreation, notifyClear, notifyTrigger } =
  notificationSlice.actions;

export const notify = (text, time) => {
  return async (dispatch) => {
    dispatch(notifyTrigger(text));
    setTimeout(() => {
      dispatch(notifyClear());
    }, time);
  };
};

export default notificationSlice.reducer;
