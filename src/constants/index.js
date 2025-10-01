export const API_CONFIG = {
  TIMEOUT: 30000, // 30 segundos
  UPLOAD_TIMEOUT: 60000, // 60 segundos
  RETRY_DELAY: 1000, // 1 segundo
  HEALTH_CHECK_TIMEOUT: 5000, // 5 segundos
};

export const FILE_LIMITS = {
  MAX_SIZE_BYTES: 10 * 1024 * 1024, // 10MB
  MAX_SIZE_MB: 10,
  ALLOWED_TYPES: ["application/pdf", "text/plain"],
  ALLOWED_EXTENSIONS: [".pdf", ".txt"],
};

export const UI_CONFIG = {
  TOAST_DURATION: 4000, // 4 segundos
  REFETCH_DELAY: 1000, // 1 segundo
  LOADING_DEBOUNCE: 300, // 300ms
};

export const STATUS = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
  PENDING: "pending",
};

export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: `Arquivo muito grande. Máximo permitido: ${FILE_LIMITS.MAX_SIZE_MB}MB`,
  INVALID_FILE_TYPE: "Apenas arquivos PDF e TXT são permitidos",
  NETWORK_ERROR: "Erro de conexão. Verifique sua internet.",
  TIMEOUT_ERROR: "Tempo esgotado. Tente novamente.",
  GENERIC_ERROR: "Ocorreu um erro inesperado. Tente novamente.",
  AUTH_ERROR: "Sessão expirada. Faça login novamente.",
  VALIDATION_ERROR: "Por favor, verifique os dados informados.",
};

export const SUCCESS_MESSAGES = {
  LOGIN: "Login realizado com sucesso!",
  REGISTER: "Usuário registrado com sucesso! Faça login.",
  LOGOUT: "Logout realizado com sucesso!",
  EMAIL_PROCESSED: "Email enviado para processamento!",
  FILE_UPLOADED: "Arquivo enviado com sucesso!",
};
