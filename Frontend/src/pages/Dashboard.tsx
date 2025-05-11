import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Users,
  Calendar,
  ClipboardList,
  BarChart2,
  MessageSquare,
  Settings,
  LogOut,
  DollarSign,
} from "lucide-react";
import Button from "../components/ui/Button";
import { Navigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const appointments = [
    {
      id: 1,
      patientName: "Ana López",
      date: "26 de abril de 2024",
      time: "10:00",
      type: "Presencial",
    },
    {
      id: 2,
      patientName: "Jorge Sánchez",
      date: "26 de abril de 2024",
      time: "15:00",
      type: "Online",
    },
    {
      id: 3,
      patientName: "Marta Gómez",
      date: "26 de abril de 2024",
      time: "17:00",
      type: "Online",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2C3E50] text-white">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <Brain className="h-8 w-8" />
            <span className="text-xl font-semibold">Dashboard</span>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10"
            >
              <Users className="h-5 w-5" />
              <button onClick={() => navigate("/Patients")}>Pacientes</button>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10"
            >
              <Calendar className="h-5 w-5" />
              <button onClick={() => navigate("/appointments")}>
                Consultas
              </button>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10"
            >
              <ClipboardList className="h-5 w-5" />
              <span>Notas de sesión</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10"
            >
              <BarChart2 className="h-5 w-5" />
              <span>Progreso</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10"
            >
              <DollarSign className="h-5 w-5" />
              <span>Pagos</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10"
            >
              <Settings className="h-5 w-5" />
              <span>Configuración</span>
            </a>
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-6">
          <a
            href="#"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 text-red-300"
          >
            <LogOut className="h-5 w-5" />
            <span>Cerrar sesión</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">David Rodriguez</h1>
                <p className="text-gray-600">Psicólogo</p>
              </div>
            </div>
            <Button size="lg" className="bg-[#4A90E2] hover:bg-[#357ABD]">
              + Nueva cita
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-2">
                <Users className="h-6 w-6 text-[#4A90E2]" />
                <span className="text-3xl font-bold">32</span>
              </div>
              <p className="text-gray-600">Pacientes activos</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="h-6 w-6 text-[#4A90E2]" />
                <span className="text-3xl font-bold">14</span>
              </div>
              <p className="text-gray-600">Citas esta semana</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-2">
                <ClipboardList className="h-6 w-6 text-[#4A90E2]" />
                <span className="text-3xl font-bold">3</span>
              </div>
              <p className="text-gray-600">Notas pendientes</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-2">
                <MessageSquare className="h-6 w-6 text-[#4A90E2]" />
                <span className="text-3xl font-bold">1</span>
              </div>
              <p className="text-gray-600">Alertas importantes</p>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Próximas consultas</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3">Paciente</th>
                  <th className="pb-3">Fecha y hora</th>
                  <th className="pb-3">Modalidad</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b last:border-0">
                    <td className="py-4">{appointment.patientName}</td>
                    <td className="py-4">
                      {appointment.date}
                      <br />
                      <span className="text-gray-600">{appointment.time}</span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          appointment.type === "Online"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {appointment.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
