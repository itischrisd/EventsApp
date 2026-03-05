import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import toastReducer from "./toastSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer
  }
});

export default store;
