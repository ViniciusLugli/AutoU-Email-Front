import api from "./api";
import { FILE_LIMITS, API_CONFIG, ERROR_MESSAGES } from "../constants";
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
        if (data.file.size > FILE_LIMITS.MAX_SIZE_BYTES) {
          throw new Error(ERROR_MESSAGES.FILE_TOO_LARGE);
        }
        formData.append("file", data.file);
      }

      const response = await api.post("/texts/processar_email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: API_CONFIG.UPLOAD_TIMEOUT,
      });
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        throw new Error(ERROR_MESSAGES.TIMEOUT_ERROR);
      }
      throw error;
    }
  },

  getTexts: async () => {
    try {
      const response = await api.get("/texts/");

      let texts = [];

      console.log("response", response.data);

      if (Array.isArray(response.data)) {
        texts = response.data;
      } else if (response.data) {
        texts =
          response.data.results ||
          response.data.items ||
          response.data.data ||
          [];
      }

      texts = Array.isArray(texts) ? texts : [];

      texts = texts.map((t) => ({
        id: t.id,
        status: t.status || t.state || "UNKNOWN",
        category: t.category || t.predicted_category || null,
        original_text: t.original_text || t.text || t.content || null,
        processed_text: t.processed_text || t.cleaned_text || null,
        generated_response: t.generated_response || t.suggested_reply || null,
        created_at: t.created_at || t.createdAt || t.created || null,
        ...t,
      }));

      console.info("Texts loaded successfully", { count: texts.length });

      return texts.sort(
        (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
      );
    } catch (error) {
      console.error("Error fetching texts", error);
      throw error;
    }
  },

  getTextById: async (textId) => {
    const response = await api.get(`/texts/${textId}`);
    return response.data;
  },

  deleteText: async (textId) => {
    const response = await api.delete(`/texts/${textId}`);
    return response.status === 204;
  },
};

export const userService = {
  getCurrentUser: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },

  updateCurrentUser: async (data) => {
    const response = await api.put("/users/me", data);
    return response.data;
  },

  deleteCurrentUser: async () => {
    const response = await api.delete("/users/me");
    return response.status === 204;
  },
};

export const systemService = {
  healthCheck: async () => {
    try {
      const response = await api.get("/health", {
        timeout: API_CONFIG.HEALTH_CHECK_TIMEOUT,
      });
      console.info("Health check realizado com sucesso");
      return { status: "ok", data: response.data };
    } catch (error) {
      console.error("Health check falhou", error);
      return {
        status: "error",
        error: error.message || ERROR_MESSAGES.NETWORK_ERROR,
      };
    }
  },

  getApiInfo: async () => {
    const response = await api.get("/");
    return response.data;
  },
};
