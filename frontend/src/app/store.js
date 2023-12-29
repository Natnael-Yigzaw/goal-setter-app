import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feautres/auth/authSlice";
import goalReducer from "../feautres/goals/goalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
});
