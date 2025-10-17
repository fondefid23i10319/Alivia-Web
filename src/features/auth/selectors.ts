import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const selectAuth = (s: RootState) => s.auth;
export const selectUser = (s: RootState) => s.auth.user;
export const selectToken = (s: RootState) => s.auth.token;
export const selectIsAuthenticated = (s: RootState) =>
  Boolean(s.auth.token && s.auth.sessionExpiration && new Date(s.auth.sessionExpiration).getTime() > Date.now());
export const selectId = createSelector([selectUser], (user) => Number(user?.id));
export const selectRole = createSelector([selectUser], (user) => user?.role ?? null);
export const selectIsPatient = createSelector([selectRole], (role) => role === "patient");
