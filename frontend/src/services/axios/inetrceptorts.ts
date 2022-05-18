import { AxiosRequestConfig } from "axios";
import { validateToken } from "../../utils/jwt";
import { getSession, refreshTokenIfExpired } from "../../utils/sessions";

export const requestInterceptor = (config: AxiosRequestConfig<any>) => {
  const { accessToken } = getSession();
  if (accessToken && validateToken(accessToken)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    config = refreshTokenIfExpired(config);
  }

  return config;
};
