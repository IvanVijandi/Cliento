import React from "react";
import { Brain, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center text-primary">
              <Brain className="h-6 w-6 mr-2" />
              <span className="text-lg font-semibold">Cliento</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Empoderando a los profesionales de la salud mental con soluciones
              inteligentes para la gestión de clientes.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Funcionalidades
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-primary transition-colors"
                >
                  Gestión de Clientes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-primary transition-colors"
                >
                  Programación de Citas
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-primary transition-colors"
                >
                  Notas de Sesión
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-primary transition-colors"
                >
                  Análisis
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Recursos
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-primary transition-colors"
                >
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-primary transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-primary transition-colors"
                >
                  Tutoriales
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-primary transition-colors"
                >
                  Casos de Estudio
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Compañía
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-primary transition-colors"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-primary transition-colors"
                >
                  Carreras
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-primary transition-colors"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-primary transition-colors"
                >
                  Términos del Servicio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Cliento. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
