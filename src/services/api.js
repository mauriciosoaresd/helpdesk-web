import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Endereço do Spring Boot
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para injetar o token JWT caso o usuário esteja logado
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;