import axios from "axios";

export const axiosProvider = axios.create({
    baseURL: import.meta.env.VITE_URL_API
})