import axios from "axios";
import { requestInterceptor } from "./inetrceptorts";

export const apibaseURL = "http://localhost:3333/api";

const axiosInstance = axios.create({
  baseURL: apibaseURL,
});

axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
