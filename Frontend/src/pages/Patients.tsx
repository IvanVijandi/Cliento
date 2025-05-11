import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  UserPlus,
  Users,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
} from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  status: "active" | "inactive";
  lastAppointment?: string;
  nextAppointment?: string;
}

const mockPatients: Patient[] = [
  {
    id: "1",
    firstName: "Ana",
    lastName: "López",
    email: "ana.lopez@email.com",
    phone: "+34 612 345 678",
    dateOfBirth: "1990-05-15",
    status: "active",
    lastAppointment: "2024-03-20",
    nextAppointment: "2024-04-26",
  },
  {
    id: "2",
    firstName: "Jorge",
    lastName: "Sánchez",
    email: "jorge.sanchez@email.com",
    phone: "+34 623 456 789",
    dateOfBirth: "1985-08-22",
    status: "active",
    lastAppointment: "2024-03-25",
    nextAppointment: "2024-04-26",
  },
  {
    id: "3",
    firstName: "Marta",
    lastName: "Gómez",
    email: "marta.gomez@email.com",
    phone: "+34 634 567 890",
    dateOfBirth: "1995-02-10",
    status: "inactive",
    lastAppointment: "2024-03-15",
  },
];

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    status: "active",
  });

  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      patient.firstName.toLowerCase().includes(searchLower) ||
      patient.lastName.toLowerCase().includes(searchLower) ||
      patient.email.toLowerCase().includes(searchLower)
    );
  });

  const handleAddPatient = () => {
    if (newPatient.firstName && newPatient.lastName && newPatient.email) {
      const patient: Patient = {
        id: Date.now().toString(),
        firstName: newPatient.firstName,
        lastName: newPatient.lastName,
        email: newPatient.email,
        phone: newPatient.phone || "",
        dateOfBirth: newPatient.dateOfBirth || "",
        status: newPatient.status as "active" | "inactive",
      };
      setPatients([...patients, patient]);
      setNewPatient({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        status: "active",
      });
      setShowAddModal(false);
    }
  };

  const handleUpdatePatient = () => {
    if (editingPatient) {
      setPatients(
        patients.map((p) => (p.id === editingPatient.id ? editingPatient : p))
      );
      setEditingPatient(null);
    }
  };

  const handleDeletePatient = (id: string) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este paciente?")
    ) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-primary mr-2" />
              <h1 className="text-2xl font-semibold text-gray-900">
                Pacientes
              </h1>
            </div>
            <Button onClick={() => setShowAddModal(true)}>
              <UserPlus className="h-5 w-5 mr-2" />
              Nuevo Paciente
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar pacientes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Cita
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Próxima Cita
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center">
                        {patient.firstName[0]}
                        {patient.lastName[0]}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {patient.firstName} {patient.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(patient.dateOfBirth).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.email}</div>
                    <div className="text-sm text-gray-500">{patient.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        patient.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {patient.status === "active" ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.lastAppointment
                      ? new Date(patient.lastAppointment).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.nextAppointment
                      ? new Date(patient.nextAppointment).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setEditingPatient(patient)}
                      className="text-primary hover:text-primary-dark mr-3"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeletePatient(patient.id)}
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

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Nuevo Paciente
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
                  label="Nombre"
                  value={newPatient.firstName}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, firstName: e.target.value })
                  }
                  placeholder="Nombre del paciente"
                />
                <Input
                  label="Apellidos"
                  value={newPatient.lastName}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, lastName: e.target.value })
                  }
                  placeholder="Apellidos del paciente"
                />
                <Input
                  label="Email"
                  type="email"
                  value={newPatient.email}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, email: e.target.value })
                  }
                  placeholder="email@ejemplo.com"
                />
                <Input
                  label="Teléfono"
                  value={newPatient.phone}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, phone: e.target.value })
                  }
                  placeholder="+34 600 000 000"
                />
                <Input
                  label="Fecha de nacimiento"
                  type="date"
                  value={newPatient.dateOfBirth}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      dateOfBirth: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddPatient}>Guardar</Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Patient Modal */}
      {editingPatient && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Editar Paciente
                </h3>
                <button
                  onClick={() => setEditingPatient(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <Input
                  label="Nombre"
                  value={editingPatient.firstName}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      firstName: e.target.value,
                    })
                  }
                />
                <Input
                  label="Apellidos"
                  value={editingPatient.lastName}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      lastName: e.target.value,
                    })
                  }
                />
                <Input
                  label="Email"
                  type="email"
                  value={editingPatient.email}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      email: e.target.value,
                    })
                  }
                />
                <Input
                  label="Teléfono"
                  value={editingPatient.phone}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      phone: e.target.value,
                    })
                  }
                />
                <Input
                  label="Fecha de nacimiento"
                  type="date"
                  value={editingPatient.dateOfBirth}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      dateOfBirth: e.target.value,
                    })
                  }
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <select
                    value={editingPatient.status}
                    onChange={(e) =>
                      setEditingPatient({
                        ...editingPatient,
                        status: e.target.value as "active" | "inactive",
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setEditingPatient(null)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdatePatient}>Guardar cambios</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
