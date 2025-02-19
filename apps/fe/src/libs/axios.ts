import { AuthApiService } from "@/api/auth";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/const/cookies";
import { TokensService } from "@/services/tokens";
import axios from "axios";
import { CookieService } from "./universal-cookies";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = CookieService.get(ACCESS_TOKEN_COOKIE_NAME);

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

let isRetrying = false;
axiosInstance.interceptors.response.use(
  async (response) => {
    const originalRequest = response.config;

    const isUnauthorizedErrorIncluded = response.data.errors?.some(
      (error: { message: string }) => error.message === "Unauthorized"
    );

    if (isUnauthorizedErrorIncluded && !isRetrying) {
      const currentRefreshToken = CookieService.get(REFRESH_TOKEN_COOKIE_NAME);

      if (!currentRefreshToken) return response;

      isRetrying = true;
      try {
        const refreshResponse =
          await AuthApiService.refreshTokens(currentRefreshToken);

        const { accessToken, refreshToken } = refreshResponse;

        TokensService.setTokens(accessToken, refreshToken);

        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        console.log(accessToken);
        isRetrying = false;

        return axiosInstance(originalRequest);
      } catch (error) {
        // forceLogout();
        console.log(error);
        return Promise.reject(error);
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// old

// a "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsInVzZXJJZCI6IjY3YjU4YWVmNjBhMzMyZjY2Yjc0ZWVmYyJ9LCJpYXQiOjE3NDAwMDI5NzIsImV4cCI6MTc0MDAwMjk4N30.2NJmmb9BjjxNbkQV27p_Mxfz2qlg-McyblHlgWl_gx0"

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsInVzZXJJZCI6IjY3YjU4YWVmNjBhMzMyZjY2Yjc0ZWVmYyJ9LCJpYXQiOjE3NDAwMDQxOTMsImV4cCI6MTc0MDAwNDIwOH0.l7rqxCeVdwDJTt19zBRJaH2VOfHg35iZgZ5AZaHxd7Y"

// new

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsInVzZXJJZCI6IjY3YjU4YWVmNjBhMzMyZjY2Yjc0ZWVmYyJ9LCJpYXQiOjE3NDAwMDQxNjMsImV4cCI6MTc0MDAwNDE3OH0.r1cY9yW9w_U_-DbVNZq49yc_-CKSMWtmo5n22iZ7n3U
