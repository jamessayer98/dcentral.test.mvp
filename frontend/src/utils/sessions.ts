import axios, { AxiosRequestConfig } from "axios";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../lib/constants/session";
import axiosInstance, { apibaseURL } from "../services/axios";
import { validateToken } from "./jwt";

export const setSession = (
  accessToken: string,
  refreshToken?: string | null
) => {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const resetSession = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  delete axiosInstance.defaults.headers.common["Authorization"];
  window.location.href="/login";
};

export const getSession = (): {
  accessToken?: string;
  refreshToken?: string;
} => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  return { accessToken, refreshToken };
};

export const refreshTokenIfExpired = (
  config: AxiosRequestConfig<any>
): AxiosRequestConfig<any> => {
  const { refreshToken } = getSession();
  if (refreshToken && validateToken(refreshToken)) {
    axios
      .post<{ refresh: string; access: string }>(
        `${apibaseURL}/v1/auth/refresh`,
        {
          refreshToken,
        }
      )
      .then((response) => {
        setSession(response.data.access, response.data.refresh);
        config.headers.Authorization = `Bearer ${response.data.access}`;
      })
      .catch((error) => {
        console.error(error);
        resetSession();
        window.location.reload();
      });
  }
  return config;
};
