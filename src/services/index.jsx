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
    try {
      const formData = new FormData();
      
      if (data.text && data.text.trim()) {
        formData.append('text', data.text.trim());
      }
      
      if (data.file) {
        // Validar tamanho do arquivo (máx 10MB)
        if (data.file.size > 10 * 1024 * 1024) {
          throw new Error('Arquivo muito grande. Máximo permitido: 10MB');
        }
        formData.append('file', data.file);
      }

      const response = await api.post('/texts/processar_email', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 segundos para upload de arquivo
      });
      return response.data;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Tempo esgotado. Tente novamente.');
      }
      throw error;
    }
  },

  // Listar textos do usuário
  getTexts: async () => {
    try {
      const response = await api.get('/texts/');
      // Ordenar por data de criação (mais recente primeiro)
      const texts = Array.isArray(response.data) ? response.data : [];
      return texts.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    } catch (error) {
      console.error('Erro ao buscar textos:', error);
      return [];
    }
  },

  // Buscar um texto específico por ID
  getTextById: async (textId) => {
    const response = await api.get(`/texts/${textId}`);
    return response.data;
  }
};

// Serviços de usuário
export const userService = {
  // Listar usuários (se necessário)
  getUsers: async () => {
    const response = await api.get('/users/');
    return response.data;
  },

  // Obter perfil do usuário atual
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

// Serviços de sistema
export const systemService = {
  // Verificar se a API está funcionando
  healthCheck: async () => {
    try {
      const response = await api.get('/health', { timeout: 5000 });
      return { status: 'ok', data: response.data };
    } catch (error) {
      return { 
        status: 'error', 
        error: error.message || 'API não está respondendo' 
      };
    }
  },

  // Obter informações da API
  getApiInfo: async () => {
    const response = await api.get('/');
    return response.data;
  }
};