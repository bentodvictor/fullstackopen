import { createSlice } from "@reduxjs/toolkit";
import { notify } from "./notificationReducer";
import userService from "../services/users";

const userSlice = createSlice({
  name: "userList",
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
  },
});

const { setUsers } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getUsers();
      dispatch(setUsers(users));
    } catch (error) {
      const message = error.response.data.error;
      dispatch(notify({ type: "error", message: message }));
    }
  };
};

export default userSlice.reducer;
