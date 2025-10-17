import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  fullName: string;
  email: string;
  profile: string | null;
  role: string;
  [k: string]: any;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  sessionExpiration: string | null;
}

const getInitialAuth = (): AuthState => {
  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return { user: null, token: null, sessionExpiration: null };
    return JSON.parse(raw) as AuthState;
  } catch {
    return { user: null, token: null, sessionExpiration: null };
  }
};

const initialState: AuthState = getInitialAuth();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string; sessionExpiration?: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.sessionExpiration = action.payload.sessionExpiration ?? null;
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.sessionExpiration = null;
    },
  },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
