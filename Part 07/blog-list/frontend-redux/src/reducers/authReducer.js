import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login.js";
import blogService from "../services/blogs.js";
import { notify } from "./notificationReducer.js";

const authSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});

const { setUser, removeUser } = authSlice.actions;

// Methods
export const userLogin = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      dispatch(setUser(user));
      dispatch(notify({ type: "success", message: "Successfully logged-in" }));
    } catch (error) {
      const message = error.response.data.error;
      dispatch(notify({ type: "error", message: `${message}` }));
    }
  };
};

export const userAlreadyLoggedin = () => {
  return async (dispatch) => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(removeUser());
  };
};

// Used on store
export default authSlice.reducer;
