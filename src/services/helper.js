import axios from "axios";
import { getToken } from "../auth";

const base_url = 'http://localhost:8080';
export default base_url;

export const myAxios = axios.create({
    baseURL: base_url,
});

export const privateAxios = axios.create({
    baseURL: base_url
})

privateAxios.interceptors.request.use(
    config => {
        const token = getToken();
        console.log(token);

        if (token) {
            // Ensure headers object exists
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => Promise.reject(error)
);

