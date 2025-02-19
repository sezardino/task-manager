import { AuthApiService } from "@/api/auth";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/const/cookies";
import { TokensService } from "@/services/tokens";
import { forceLogout } from "@/utils/force-logout";
import axios from "axios";
import { CookieService } from "./universal-cookies";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = CookieService.get(ACCESS_TOKEN_COOKIE_NAME);
  const bearer = config.headers.Authorization;
  if (token && !bearer) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

let isRetrying = false;
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !isRetrying) {
      const token = CookieService.get(REFRESH_TOKEN_COOKIE_NAME);

      if (!token) return Promise.reject(error);

      isRetrying = true;
      try {
        const refreshResponse = await AuthApiService.refreshTokens(token);

        const { accessToken, refreshToken } =
          refreshResponse.data.data.refreshTokens;

        TokensService.setTokens(accessToken, refreshToken);

        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        forceLogout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
