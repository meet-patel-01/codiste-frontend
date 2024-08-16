import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { API_URL } from "../constant";
import {} from "@reduxjs/toolkit";

export let authToken: string = ""; /* initially it will be empty, we didn't implement this feature yet */
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});


const onConfig = (_config: InternalAxiosRequestConfig) => {
  _config.headers.Authorization = `Bearer ${authToken}`;
  return _config;
};
const onError = (_error: any) => Promise.reject(_error);

axiosInstance.interceptors.request.use(onConfig, onError);
