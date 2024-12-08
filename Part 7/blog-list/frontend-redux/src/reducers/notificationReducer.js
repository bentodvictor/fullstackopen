import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: (state, action) => {
      return null;
    },
  },
});

const { setNotification, clearNotification } = notificationSlice.actions;

// Methods
export const notify = ({ type, message }) => {
  return async (dispatch) => {
    dispatch(setNotification({ type, message }));

    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
