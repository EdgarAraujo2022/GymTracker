import axios from "axios";
import type { AxiosInstance } from 'axios';

const API_BASE_URL = "http://localhost:5114/api";

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Erro na API:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;
