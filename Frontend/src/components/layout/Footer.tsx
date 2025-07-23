import React from 'react';
import { Brain, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información de la empresa */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center text-primary">
              <Brain className="h-6 w-6 mr-2" />
              <span className="text-lg font-semibold">Cliento</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Simplificando la gestión de consultorios para profesionales de salud mental.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contacto@cliento.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+54 11 1234-5678</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>
          
          {/* Funciones principales */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Funciones
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/patients" className="text-base text-gray-600 hover:text-primary transition-colors">
                  Gestión de Pacientes
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-base text-gray-600 hover:text-primary transition-colors">
                  Programación de Consultas
                </Link>
              </li>
              <li>
                <Link to="/notes" className="text-base text-gray-600 hover:text-primary transition-colors">
                  Notas de Sesión
                </Link>
              </li>
              <li>
                <span className="text-base text-gray-600">
                  Consultas Virtuales
                </span>
              </li>
            </ul>
          </div>
          
          {/* Legal y soporte */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Soporte
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:soporte@cliento.com" className="text-base text-gray-600 hover:text-primary transition-colors">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="mailto:contacto@cliento.com" className="text-base text-gray-600 hover:text-primary transition-colors">
                  Contactar Soporte
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-primary transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-primary transition-colors">
                  Términos de Servicio
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-500 text-center md:text-left">
              &copy; {new Date().getFullYear()} Cliento. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/login" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;