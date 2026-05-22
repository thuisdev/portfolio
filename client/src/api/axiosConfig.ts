import axios from 'axios';
import { getStoredToken, logout } from './auth';

axios.interceptors.request.use(
    (config) => {
        const token = getStoredToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const is401 = error.response?.status === 401;
        const isAuthRoute = error.config?.url?.includes('/api/auth');

        if (is401 && !isAuthRoute) {
            logout();
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default axios;