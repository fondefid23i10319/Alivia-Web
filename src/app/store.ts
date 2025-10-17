import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("auth", JSON.stringify(state.auth));
  } catch (error) {
    console.error(error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
