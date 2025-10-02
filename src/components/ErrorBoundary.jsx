import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      const isDevelopment = import.meta.env.DEV;

      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-16 w-16 text-red-500" />
              </div>

              <h1 className="text-2xl font-bold text-white mb-4">
                Algo deu errado
              </h1>

              <p className="text-gray-400 mb-6">
                Ocorreu um erro inesperado. Nossa equipe foi notificada e está
                trabalhando para resolver o problema.
              </p>

              {isDevelopment && this.state.error && (
                <div className="bg-gray-700 rounded p-4 mb-6 text-left">
                  <h3 className="text-red-400 font-semibold mb-2">
                    Detalhes do Erro (Desenvolvimento):
                  </h3>
                  <pre className="text-xs text-gray-300 overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                  {this.state.errorInfo && (
                    <pre className="text-xs text-gray-400 mt-2 overflow-auto">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={this.handleReset}
                  className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Tentar Novamente
                </button>

                <button
                  onClick={this.handleGoHome}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Voltar ao Início
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
