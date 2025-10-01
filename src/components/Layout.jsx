import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { LogOut, Mail, User } from "lucide-react";

const Layout = () => {
  const { logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {isAuthenticated && (
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Mail className="h-8 w-8 text-purple-500" />
                <h1 className="ml-2 text-xl font-bold text-white">AutoU</h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-300">
                  <User className="h-5 w-5 mr-2" />
                  <span>Usuário</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
