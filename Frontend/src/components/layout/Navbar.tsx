import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Brain } from "lucide-react";
import Button from "../ui/Button";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const userJson = localStorage.getItem("user");
  const isAuthenticated = !!userJson;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-primary hover:text-primary-dark transition-colors"
            >
              <Brain className="h-8 w-8 mr-2" />
              <span className="text-lg font-semibold">Cliento</span>
            </Link>
          </div>

          {/* Navegación en escritorio */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link
              to="/"
              className="px-3 py-2 text-gray-700 hover:text-primary transition-colors"
            >
              Inicio
            </Link>
            <Link
              to="#features"
              className="px-3 py-2 text-gray-700 hover:text-primary transition-colors"
            >
              Funcionalidades
            </Link>
            <Link
              to="#pricing"
              className="px-3 py-2 text-gray-700 hover:text-primary transition-colors"
            >
              Precios
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 text-gray-700 hover:text-primary transition-colors"
                >
                  Panel
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Iniciar sesión</Button>
                </Link>
                <Link to="/register">
                  <Button>Comenzar</Button>
                </Link>
              </>
            )}
          </div>

          {/* Botón del menú móvil */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="#features"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Funcionalidades
            </Link>
            <Link
              to="#pricing"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Precios
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Panel
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Comenzar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
