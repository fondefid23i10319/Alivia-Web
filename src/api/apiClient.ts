import baseApi from "./baseApi";
import store from "../app/store";
import type { InternalAxiosRequestConfig } from "axios";

const TOKEN_PREFIX_DEFAULT = "Token";

baseApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  try {
    const state = store.getState();
    const token = state.auth?.token;
    const tokenType = TOKEN_PREFIX_DEFAULT;
    if (config.headers) {
      const hasAuthHeader =
        !!config.headers["Authorization"] || !!(config.headers as Record<string, any>)["authorization"];

      if (!hasAuthHeader && token) {
        config.headers["Authorization"] = `${tokenType} ${token}`;
      }
    }
  } catch (err) {
    console.error(err);
  }
  return config;
});

export default baseApi;
