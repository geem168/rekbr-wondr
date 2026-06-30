import axios from "axios";
import qs from "qs";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.data?.message === "invalid signature" ||
      error?.response?.data?.message?.includes("token") ||
      error?.response?.data?.message?.includes("jwt") ||
      error?.response?.status === 401 || // Unauthorized
      error?.response?.status === 403 // Forbidden
    ) {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }
    return Promise.reject(error?.response?.data ? error?.response?.data : error)
  }
);

export default api;
