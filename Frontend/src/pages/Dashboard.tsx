import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Users,
  Calendar,
  ClipboardList,
  LogOut,
  AlertCircle,
  Home,
} from "lucide-react";
import Button from "../components/ui/Button";

// Interfaces para los datos de la API
interface Profesional {
  id: string;
  nombre: string;
  apellido: string;
  matricula: string;
  email?: string;
  is_active: boolean;
  is_staff: boolean;
}

interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
  dni: string;
  direccion: string;
  altura: number;
  peso: number;
}

interface Consulta {
  id: string;
  fecha: string;
  profesional: number;
  consultorio: number;
  paciente: number;
  virtual: boolean;
}

interface Ficha {
  id: string;
  paciente: number;
}

interface EstadisticasDashboard {
  pacientesActivos: number;
  citasEstaSemana: number;
  notasPendientes: number;
  alertasImportantes: number;
}


//csrf token
const getCSRFToken = () => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') {
      return value; 
    }
  }
  return null;
};


const Dashboard: React.FC = () => {
  // Variable de entorno para la API
  const API_BASE_URL = import.meta.env.VITE_API_URL ;

  const [profesional, setProfesional] = useState<Profesional | null>(null);
  const [estadisticas, setEstadisticas] = useState<EstadisticasDashboard>({
    pacientesActivos: 0,
    citasEstaSemana: 0,
    notasPendientes: 0,
    alertasImportantes: 0,
  });
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

 
  const fetchData = async (endpoint: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`Error al obtener ${endpoint}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  };

  // Función para obtener la fecha de la semana actual
  const getWeekRange = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));
    return { startOfWeek, endOfWeek };
  };

  // Función para filtrar consultas de esta semana
  const filterConsultasThisWeek = (consultas: Consulta[]) => {
    const { startOfWeek, endOfWeek } = getWeekRange();
    return consultas.filter(consulta => {
      const consultaDate = new Date(consulta.fecha);
      return consultaDate >= startOfWeek && consultaDate <= endOfWeek;
    });
  };

  // Función principal para cargar todos los datos
  const cargarDatosDashboard = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Obtener todos los datos en paralelo (usando variable de entorno)
      const [
        profesionalesData,
        pacientesData,
        consultasData,
        fichasData
      ] = await Promise.all([
        fetchData('profesional'),
        fetchData('paciente'),
        fetchData('consulta'),
        fetchData('ficha')
      ]);

      // Establecer datos de pacientes
      setPacientes(pacientesData);

      // Obtener el primer profesional (en una app real sería el usuario logueado)
      if (profesionalesData.length > 0) {
        setProfesional(profesionalesData[0]);
      }

      // Calcular estadísticas
      const pacientesActivos = pacientesData.length;
      const citasEstaSemana = filterConsultasThisWeek(consultasData).length;
      const notasPendientes = fichasData.length;
      const alertasImportantes = Math.floor(Math.random() * 3) + 1; // Simulado

      setEstadisticas({
        pacientesActivos,
        citasEstaSemana,
        notasPendientes,
        alertasImportantes
      });

    } catch (error) {
      setError('Error al cargar los datos del dashboard');
      console.error('Error al cargar datos del dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatosDashboard();
  }, []);
 

  // Función para manejar el logout
  const handleLogout = async () => {
    const csrfToken = getCSRFToken();

    await fetch(`${API_BASE_URL}/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {}),
      },
      credentials: 'include', 
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar el dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={cargarDatosDashboard}>
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar con colores originales */}
      <aside className="w-64 bg-[#2C3E50] text-white">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <Brain className="h-8 w-8" />
            <span className="text-xl font-semibold">Cliento</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <button className="bg-white/10 text-white group flex items-center px-3 py-3 text-sm font-medium rounded-lg w-full text-left">
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </button>
            
            <button
              className="text-white hover:bg-white/10 group flex items-center px-3 py-3 text-sm font-medium rounded-lg w-full text-left transition-colors"
              onClick={() => navigate("/patients")}
            >
              <Users className="h-5 w-5 mr-3" />
              Pacientes
            </button>
            
            <button
              className="text-white hover:bg-white/10 group flex items-center px-3 py-3 text-sm font-medium rounded-lg w-full text-left transition-colors"
              onClick={() => navigate("/appointments")}
            >
              <Calendar className="h-5 w-5 mr-3" />
              Consultas
            </button>
            
            <button
              className="text-white hover:bg-white/10 group flex items-center px-3 py-3 text-sm font-medium rounded-lg w-full text-left transition-colors"
              onClick={() => navigate("/notes")}
            >
              <ClipboardList className="h-5 w-5 mr-3" />
              Notas de sesión
            </button>
          </nav>
        </div>

        {/* User info y logout */}
        <div className="absolute bottom-0 w-64 p-6">
          {profesional && (
            <div className="flex items-center space-x-3 mb-4 p-3 bg-white/5 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {profesional.nombre[0]}{profesional.apellido[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {profesional.nombre} {profesional.apellido}
                </p>
                <p className="text-xs text-gray-300 truncate">
                  Mat: {profesional.matricula}
                </p>
              </div>
            </div>
          )}
          
          <button
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 text-red-300 w-full text-left transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header simplificado */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Resumen general de tu práctica profesional
            </p>
          </div>

          {/* Stats Grid principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Pacientes activos</p>
                  <p className="text-3xl font-bold text-gray-900">{estadisticas.pacientesActivos}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Citas esta semana</p>
                  <p className="text-3xl font-bold text-gray-900">{estadisticas.citasEstaSemana}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClipboardList className="h-8 w-8 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Fichas creadas</p>
                  <p className="text-3xl font-bold text-gray-900">{estadisticas.notasPendientes}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-8 w-8 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Alertas pendientes</p>
                  <p className="text-3xl font-bold text-gray-900">{estadisticas.alertasImportantes}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen estadístico único */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Resumen de actividad</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 rounded-lg p-4 mb-2">
                  <span className="block text-2xl font-bold text-primary">{estadisticas.pacientesActivos}</span>
                </div>
                <span className="text-sm text-gray-600">Total pacientes</span>
              </div>
              <div className="text-center">
                <div className="bg-green-50 rounded-lg p-4 mb-2">
                  <span className="block text-2xl font-bold text-green-600">{estadisticas.citasEstaSemana}</span>
                </div>
                <span className="text-sm text-gray-600">Citas semana</span>
              </div>
              <div className="text-center">
                <div className="bg-purple-50 rounded-lg p-4 mb-2">
                  <span className="block text-2xl font-bold text-purple-600">{estadisticas.notasPendientes}</span>
                </div>
                <span className="text-sm text-gray-600">Fichas registradas</span>
              </div>
              <div className="text-center">
                <div className="bg-orange-50 rounded-lg p-4 mb-2">
                  <span className="block text-2xl font-bold text-orange-600">{estadisticas.alertasImportantes}</span>
                </div>
                <span className="text-sm text-gray-600">Alertas pendientes</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;