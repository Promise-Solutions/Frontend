import axios from "axios";
import { isTokenValid } from "../hooks/tokenUtils";
import { showToast } from "../components/toastStyle/ToastStyle";

export const axiosProvider = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
});

axiosProvider.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && isTokenValid(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (token && !isTokenValid(token)) {
      localStorage.removeItem("token");
      // redirecionamento programático
      window.location.href = "/login";
      showToast.error("Para sua segurança. Faça login novamente.");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosProvider.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
