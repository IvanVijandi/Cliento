import React from "react";
import { Navigate } from "react-router-dom";
import { Users, Calendar, Clock, PlusCircle } from "lucide-react";
import Button from "../components/ui/Button";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

type Appointment = {
  id: number;
  clientName: string;
  date: string;
  time: string;
  type: string;
};

type Client = {
  id: number;
  name: string;
  lastSession: string;
  nextSession: string;
};

const Dashboard: React.FC = () => {
  // Verificar si el usuario ha iniciado sesión
  const userJson = localStorage.getItem("user");

  if (!userJson) {
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(userJson) as User;

  // Datos simulados para demostración
  const upcomingAppointments: Appointment[] = [
    {
      id: 1,
      clientName: "Sarah Johnson",
      date: "2025-03-15",
      time: "09:00 AM",
      type: "Sesión de Terapia",
    },
    {
      id: 2,
      clientName: "Michael Chen",
      date: "2025-03-15",
      time: "11:30 AM",
      type: "Consulta Inicial",
    },
    {
      id: 3,
      clientName: "Emma Rodriguez",
      date: "2025-03-16",
      time: "02:00 PM",
      type: "Seguimiento",
    },
  ];

  const recentClients: Client[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      lastSession: "2025-03-08",
      nextSession: "2025-03-15",
    },
    {
      id: 2,
      name: "Michael Chen",
      lastSession: "Nuevo Cliente",
      nextSession: "2025-03-15",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      lastSession: "2025-03-02",
      nextSession: "2025-03-16",
    },
    {
      id: 4,
      name: "David Wilson",
      lastSession: "2025-03-07",
      nextSession: "No Programada",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="text-primary font-semibold text-lg">
                MindTrack
              </a>
            </div>
            <div className="flex items-center">
              <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <span className="sr-only">Ver notificaciones</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                <div className="ml-3 relative">
                  <div>
                    <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      <span className="sr-only">Abrir menú de usuario</span>
                      <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center text-primary font-semibold">
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
                ¡Bienvenido de nuevo, {user.firstName}!
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Button variant="outline" className="mr-4">
                <Calendar className="h-4 w-4 mr-2" />
                Programar Sesión
              </Button>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Agregar Nuevo Cliente
              </Button>
            </div>
          </div>

          {/* Aquí continúa el resto del contenido traducido */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
