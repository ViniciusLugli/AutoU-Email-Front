export const API_CONFIG = {
  TIMEOUT: 30000, //milissegundos
  UPLOAD_TIMEOUT: 60000, //milissegundos
  RETRY_DELAY: 1000, //milissegundos
  HEALTH_CHECK_TIMEOUT: 5000, //milissegundos
};

export const FILE_LIMITS = {
  MAX_SIZE_BYTES: 10 * 1024 * 1024, // 10MB
  MAX_SIZE_MB: 10,
  ALLOWED_TYPES: ["application/pdf", "text/plain"],
  ALLOWED_EXTENSIONS: [".pdf", ".txt"],
};

export const UI_CONFIG = {
  TOAST_DURATION: 4000, //segundos
  REFETCH_DELAY: 1000, //milissegundos
  LOADING_DEBOUNCE: 300, //milissegundos
};

export const STATUS = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
  PENDING: "pending",
};

export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: `File too large. Maximum allowed: ${FILE_LIMITS.MAX_SIZE_MB}MB`,
  INVALID_FILE_TYPE: "Only PDF and TXT files are allowed",
  NETWORK_ERROR: "Network error. Check your internet connection.",
  TIMEOUT_ERROR: "Request timed out. Please try again.",
  GENERIC_ERROR: "An unexpected error occurred. Please try again.",
  AUTH_ERROR: "Session expired. Please log in again.",
  VALIDATION_ERROR: "Please check the provided information.",
};

export const SUCCESS_MESSAGES = {
  LOGIN: "Login successful!",
  REGISTER: "User registered successfully! Please log in.",
  LOGOUT: "Logout successful!",
  EMAIL_PROCESSED: "Email submitted for processing!",
  FILE_UPLOADED: "File uploaded successfully!",
};
