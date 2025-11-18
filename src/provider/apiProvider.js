import axios from "axios";
import { isTokenValid } from "../hooks/tokenUtils";
import { showToast } from "../components/toastStyle/ToastStyle";
import { logoutEmitter } from "../event/logoutEmitter";

export const axiosProvider = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
});

axiosProvider.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");

    if (token && isTokenValid(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    } 
    else if (token && !isTokenValid(token)) {
      // Token expirado
      localStorage.removeItem("token");
      localStorage.removeItem("userLogged");
      showToast.error("Para sua segurança, faça login novamente.");
      logoutEmitter.emit("logout");
    }

    return config;
  },
  error => Promise.reject(error)
);

axiosProvider.interceptors.response.use(
  res => res,
  err => {
    if ([401, 403].includes(err.response?.status)) {
      logoutEmitter.emit("logout");
    }
    return Promise.reject(err);
  }
);
