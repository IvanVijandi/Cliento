import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Plus,
  Edit2,
  Trash2,
  X,
  Video,
  MapPin,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  duration: number;
  type: "Presencial" | "Online";
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "Ana López",
    date: "2024-04-26",
    time: "10:00",
    duration: 60,
    type: "Presencial",
    status: "scheduled",
    notes: "Primera consulta",
  },
  {
    id: "2",
    patientName: "Jorge Sánchez",
    date: "2024-04-26",
    time: "15:00",
    duration: 45,
    type: "Online",
    status: "scheduled",
  },
  {
    id: "3",
    patientName: "Marta Gómez",
    date: "2024-04-26",
    time: "17:00",
    duration: 60,
    type: "Online",
    status: "scheduled",
  },
];

const Appointments: React.FC = () => {
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    patientName: "",
    date: "",
    time: "",
    duration: 60,
    type: "Presencial",
    status: "scheduled",
  });

  const calendarEvents = appointments.map((appointment) => ({
    id: appointment.id,
    title: `${appointment.patientName} - ${appointment.type}`,
    start: `${appointment.date}T${appointment.time}`,
    end: `${appointment.date}T${format(
      new Date(
        new Date(`${appointment.date}T${appointment.time}`).getTime() +
          appointment.duration * 60000
      ),
      "HH:mm"
    )}`,
    backgroundColor: appointment.type === "Online" ? "#3b82f6" : "#22c55e",
    borderColor: appointment.type === "Online" ? "#2563eb" : "#16a34a",
    classNames: appointment.status === "cancelled" ? ["opacity-50"] : [],
  }));

  const handleAddAppointment = () => {
    if (
      newAppointment.patientName &&
      newAppointment.date &&
      newAppointment.time
    ) {
      const appointment: Appointment = {
        id: Date.now().toString(),
        patientName: newAppointment.patientName,
        date: newAppointment.date,
        time: newAppointment.time,
        duration: newAppointment.duration || 60,
        type: newAppointment.type as "Presencial" | "Online",
        status: "scheduled",
        notes: newAppointment.notes,
      };
      setAppointments([...appointments, appointment]);
      setNewAppointment({
        patientName: "",
        date: "",
        time: "",
        duration: 60,
        type: "Presencial",
        status: "scheduled",
      });
      setShowAddModal(false);
    }
  };

  const handleUpdateAppointment = () => {
    if (editingAppointment) {
      setAppointments(
        appointments.map((a) =>
          a.id === editingAppointment.id ? editingAppointment : a
        )
      );
      setEditingAppointment(null);
    }
  };

  const handleDeleteAppointment = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta cita?")) {
      setAppointments(appointments.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CalendarIcon className="h-6 w-6 text-primary mr-2" />
              <h1 className="text-2xl font-semibold text-gray-900">
                Consultas
              </h1>
            </div>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-5 w-5 mr-2" />
              Nueva Consulta
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Calendar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            locale={es}
            events={calendarEvents}
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            allDaySlot={false}
            height="auto"
            aspectRatio={1.8}
            expandRows={true}
            stickyHeaderDates={true}
            dayMaxEvents={true}
            eventClick={(info) => {
              const appointment = appointments.find(
                (a) => a.id === info.event.id
              );
              if (appointment) {
                setEditingAppointment(appointment);
              }
            }}
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            buttonText={{
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
            }}
          />
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duración
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center">
                        {appointment.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.patientName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(
                        new Date(appointment.date),
                        "d 'de' MMMM 'de' yyyy",
                        { locale: es }
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.duration} minutos
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        appointment.type === "Online"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {appointment.type === "Online" ? (
                        <Video className="h-4 w-4 mr-1" />
                      ) : (
                        <MapPin className="h-4 w-4 mr-1" />
                      )}
                      {appointment.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : appointment.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {appointment.status === "completed"
                        ? "Completada"
                        : appointment.status === "cancelled"
                        ? "Cancelada"
                        : "Programada"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setEditingAppointment(appointment)}
                      className="text-primary hover:text-primary-dark mr-3"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Nueva Consulta
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <Input
                  label="Paciente"
                  value={newAppointment.patientName}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      patientName: e.target.value,
                    })
                  }
                  placeholder="Nombre del paciente"
                />
                <Input
                  label="Fecha"
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      date: e.target.value,
                    })
                  }
                />
                <Input
                  label="Hora"
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      time: e.target.value,
                    })
                  }
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duración (minutos)
                  </label>
                  <select
                    value={newAppointment.duration}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        duration: Number(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value={30}>30 minutos</option>
                    <option value={45}>45 minutos</option>
                    <option value={60}>1 hora</option>
                    <option value={90}>1 hora 30 minutos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo de consulta
                  </label>
                  <select
                    value={newAppointment.type}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        type: e.target.value as "Presencial" | "Online",
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="Presencial">Presencial</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Notas
                  </label>
                  <textarea
                    value={newAppointment.notes}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        notes: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    rows={3}
                    placeholder="Notas adicionales..."
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddAppointment}>Guardar</Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Appointment Modal */}
      {editingAppointment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Editar Consulta
                </h3>
                <button
                  onClick={() => setEditingAppointment(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <Input
                  label="Paciente"
                  value={editingAppointment.patientName}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      patientName: e.target.value,
                    })
                  }
                />
                <Input
                  label="Fecha"
                  type="date"
                  value={editingAppointment.date}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      date: e.target.value,
                    })
                  }
                />
                <Input
                  label="Hora"
                  type="time"
                  value={editingAppointment.time}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      time: e.target.value,
                    })
                  }
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duración (minutos)
                  </label>
                  <select
                    value={editingAppointment.duration}
                    onChange={(e) =>
                      setEditingAppointment({
                        ...editingAppointment,
                        duration: Number(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value={30}>30 minutos</option>
                    <option value={45}>45 minutos</option>
                    <option value={60}>1 hora</option>
                    <option value={90}>1 hora 30 minutos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo de consulta
                  </label>
                  <select
                    value={editingAppointment.type}
                    onChange={(e) =>
                      setEditingAppointment({
                        ...editingAppointment,
                        type: e.target.value as "Presencial" | "Online",
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="Presencial">Presencial</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <select
                    value={editingAppointment.status}
                    onChange={(e) =>
                      setEditingAppointment({
                        ...editingAppointment,
                        status: e.target.value as
                          | "scheduled"
                          | "completed"
                          | "cancelled",
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="scheduled">Programada</option>
                    <option value="completed">Completada</option>
                    <option value="cancelled">Cancelada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Notas
                  </label>
                  <textarea
                    value={editingAppointment.notes}
                    onChange={(e) =>
                      setEditingAppointment({
                        ...editingAppointment,
                        notes: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setEditingAppointment(null)}
              >
                Cancelar
              </Button>
              <Button onClick={handleUpdateAppointment}>Guardar cambios</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
