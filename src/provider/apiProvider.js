import axios from "axios";

export const axiosProvider = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
});

axiosProvider.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
