import { useState, useEffect } from "react";
import { authService } from "../services";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../constants";
import PropTypes from "prop-types";
// logger removed: using console for lightweight logging

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      const { access_token } = response;

      authService.setToken(access_token);
      setUser({ token: access_token });

      console.info("Login successful", { email: credentials.email });
      toast.success(SUCCESS_MESSAGES.LOGIN);
      return { success: true };
    } catch (error) {
      console.error("Error during login", error);
      const message = error.response?.data?.detail || ERROR_MESSAGES.AUTH_ERROR;
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      await authService.register(userData);
      console.info("User registered successfully", { email: userData.email });
      toast.success(SUCCESS_MESSAGES.REGISTER);
      return { success: true };
    } catch (error) {
      console.error("Error during registration", error);
      const message =
        error.response?.data?.detail || ERROR_MESSAGES.GENERIC_ERROR;
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    console.info("Logout successful");
    toast.success(SUCCESS_MESSAGES.LOGOUT);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
