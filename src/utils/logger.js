// Sistema de logging centralizado
class Logger {
  constructor() {
    this.isDevelopment = import.meta.env.DEV;
    this.logs = [];
  }

  // Log de informação
  info(message, data = null) {
    const logEntry = this._createLogEntry("INFO", message, data);
    this.logs.push(logEntry);

    if (this.isDevelopment) {
      console.log(`[INFO] ${message}`, data || "");
    }
  }

  // Log de warning
  warn(message, data = null) {
    const logEntry = this._createLogEntry("WARN", message, data);
    this.logs.push(logEntry);

    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, data || "");
    }
  }

  // Log de erro
  error(message, error = null) {
    const logEntry = this._createLogEntry("ERROR", message, {
      error: error?.message || error,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
    });
    this.logs.push(logEntry);

    console.error(`[ERROR] ${message}`, error || "");

    // Em produção, aqui você enviaria para um serviço como Sentry
    this._sendToMonitoringService(logEntry);
  }

  // Log de debug (apenas em desenvolvimento)
  debug(message, data = null) {
    if (this.isDevelopment) {
      console.log(`[DEBUG] ${message}`, data || "");
    }
  }

  // Criar entrada de log padronizada
  _createLogEntry(level, message, data) {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };
  }

  // Enviar para serviço de monitoramento (mock)
  _sendToMonitoringService(logEntry) {
    if (!this.isDevelopment && logEntry.level === "ERROR") {
      // Em produção, aqui você faria:
      // - Envio para Sentry
      // - Envio para LogRocket
      // - Envio para seu backend de logs
      console.log("📊 Log enviado para monitoramento:", logEntry);
    }
  }

  // Obter todos os logs
  getLogs() {
    return this.logs;
  }

  // Limpar logs
  clearLogs() {
    this.logs = [];
  }

  // Exportar logs como JSON
  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Instância singleton do logger
const logger = new Logger();

export default logger;
