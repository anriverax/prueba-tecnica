/**
 * Custom hook for making Axios requests with NextAuth.js session handling.
 *
 * @param isPrivate - Indicates whether the request requires authentication.
 * @returns Axios instance with interceptors for handling sessions and errors.
 */
import { useEffect } from "react";

import axios, { AxiosError } from "axios";

// Axios configuration
const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API ? process.env.NEXT_PUBLIC_BACKEND_API : undefined,
  headers: { "Content-Type": "multipart/form-data" }
});

/**
 * Custom hook for making Axios requests with NextAuth.js session handling.
 *
 * @returns Axios instance with interceptors for handling sessions and errors.
 */
const useAxios = () => {
  /* eslint-disable */
  useEffect(() => {
    // Request interceptor
    const requestIntercept = axiosConfig.interceptors.request.use(
      (config) => {
        config.headers["X-API-Key"] = process.env.NEXT_PUBLIC_CLIENT_API_KEY;

        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // Response interceptor
    const responseIntercept = axiosConfig.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest: any = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          return axiosConfig(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosConfig.interceptors.request.eject(requestIntercept);
      axiosConfig.interceptors.response.eject(responseIntercept);
    };
  }, []);
  /* eslint-enable */

  return axiosConfig;
};

export default useAxios;
