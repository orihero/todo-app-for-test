import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import { DEBUG } from "@/constants/global";
import {
  clearLocalStore,
  selectTokens,
  selectUser,
  setTokens,
} from "../LocalStore";
import store from "../store";

// Extend the InternalAxiosRequestConfig interface
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const baseURL = "https://test-back.cryptelligence.ai/api/v1";
const ApiClient: AxiosInstance = axios.create({
  baseURL,
});

ApiClient.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const state = store.getState();
    const tokens = selectTokens(state);

    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }

    const method = config.method?.toUpperCase();
    const url = config.url;
    const message = `${method}:${config.baseURL}${url}`;
    if (DEBUG) console.info([message, new Date().toLocaleString()]);

    return config;
  },
  (error) => Promise.reject(error)
);

ApiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // Ensure originalRequest is of CustomAxiosRequestConfig type
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      originalRequest &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const state = store.getState();
        const tokens = selectTokens(state);
        const user = selectUser(state);

        if (tokens?.refreshToken) {
          // Call your refresh token endpoint here
          const response = await ApiClient.post("/auth/refresh", {
            id: user?.id,
            refreshToken: tokens.refreshToken,
          });
          const newAccessToken = response.data.accessToken;

          // Dispatch action to update tokens in the store
          store.dispatch(
            setTokens({
              accessToken: newAccessToken,
              refreshToken: tokens.refreshToken,
            })
          );

          // Set the new access token on the original request
          ApiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return ApiClient(originalRequest);
        }
      } catch (err: any) {
        if (err.response?.status === 403) {
          store.dispatch(clearLocalStore());
        }
        if (DEBUG) console.error("[Refresh Token Error]:", err);
      }
    }

    return Promise.reject(error);
  }
);

export default ApiClient;
