import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import blogReducer from "./blogReducer";
import notificationReducer from "./notificationReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    noty: notificationReducer,
  },
});
