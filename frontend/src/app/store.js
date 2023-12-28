import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feautres/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
