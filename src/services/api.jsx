import axios from 'axios';

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Se erro 401 e não é uma tentativa de login/registro
    if (error.response?.status === 401 && !originalRequest.url?.includes('/auth/')) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(error);
    }
    
    // Retry para erros de rede ou servidor (5xx)
    if (
      (!error.response || error.response.status >= 500) &&
      !originalRequest._retry &&
      originalRequest.method?.toLowerCase() === 'get'
    ) {
      originalRequest._retry = true;
      
      // Aguarda 1 segundo antes de tentar novamente
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return api(originalRequest);
    }
    
    return Promise.reject(error);
  }
);

export default api;