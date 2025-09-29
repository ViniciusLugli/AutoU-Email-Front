import api from './api';

// Serviços de autenticação
export const authService = {
  // Registro de usuário
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login de usuário
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Logout (limpa token local)
  logout: () => {
    localStorage.removeItem('token');
  },

  // Verifica se está logado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Pega o token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Salva o token
  setToken: (token) => {
    localStorage.setItem('token', token);
  }
};

// Serviços de processamento de texto
export const textService = {
  // Processar email (texto ou arquivo)
  processEmail: async (data) => {
    const formData = new FormData();
    
    if (data.text) {
      formData.append('text', data.text);
    }
    
    if (data.file) {
      formData.append('file', data.file);
    }

    const response = await api.post('/texts/processar_email', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Listar textos do usuário
  getTexts: async () => {
    const response = await api.get('/texts/');
    return response.data;
  }
};

// Serviços de usuário
export const userService = {
  // Listar usuários (se necessário)
  getUsers: async () => {
    const response = await api.get('/users/');
    return response.data;
  }
};