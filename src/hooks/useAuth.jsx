import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Hook customizado para usar o contexto de autenticação
 * Deve ser usado dentro de um AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
