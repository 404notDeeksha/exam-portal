// Centralized API handler with interceptors for errors and JWT.
import axios from "axios";

// Common error handler
const handleError = (error) => {
  const message =
    error.response?.data?.message || error.message || "Something went wrong";
  return Promise.reject(message);
};

// Instance WITHOUT token (public)
export const publicAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const privateAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Attach token to private requests
let getToken = () => null;

export const setTokenGetter = (fn) => {
  getToken = fn;
};

privateAPI.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add error handling to both
publicAPI.interceptors.response.use((res) => res, handleError);
privateAPI.interceptors.response.use((res) => res, handleError);
