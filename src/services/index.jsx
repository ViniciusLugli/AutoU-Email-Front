import api from "./api";

// Serviços de autenticação
export const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  setToken: (token) => {
    localStorage.setItem("token", token);
  },
};

export const textService = {
  processEmail: async (data) => {
    try {
      const formData = new FormData();

      if (data.text && data.text.trim()) {
        formData.append("text", data.text.trim());
      }

      if (data.file) {
        if (data.file.size > 10 * 1024 * 1024) {
          throw new Error("Arquivo muito grande. Máximo permitido: 10MB");
        }
        formData.append("file", data.file);
      }

      const response = await api.post("/texts/processar_email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000,
      });
      return response.data;
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        throw new Error("Tempo esgotado. Tente novamente.");
      }
      throw error;
    }
  },

  getTexts: async () => {
    try {
      const response = await api.get("/texts/");
      const texts = Array.isArray(response.data) ? response.data : [];
      return texts.sort(
        (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
      );
    } catch (error) {
      console.error("Erro ao buscar textos:", error);
      return [];
    }
  },

  getTextById: async (textId) => {
    const response = await api.get(`/texts/${textId}`);
    return response.data;
  },
};

export const userService = {
  getUsers: async () => {
    const response = await api.get("/users/");
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

export const systemService = {
  healthCheck: async () => {
    try {
      const response = await api.get("/health", { timeout: 5000 });
      return { status: "ok", data: response.data };
    } catch (error) {
      return {
        status: "error",
        error: error.message || "API não está respondendo",
      };
    }
  },

  getApiInfo: async () => {
    const response = await api.get("/");
    return response.data;
  },
};
