import React, { useState, useEffect } from "react";
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
  Loader,
} from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

// Interface que coincide con el modelo de Django
interface Patient {
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

// Interface para crear nuevos pacientes
interface NewPatient {
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
const API_BASE_URL = import.meta.env.VITE_API_URL ;


const getCSRFtoken = (): string | null => {
  const name = 'csrftoken';
  let cookieValue = null;
  
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  
  return cookieValue;
};


const Patients: React.FC = () => {
  console.log(getCSRFtoken());
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newPatient, setNewPatient] = useState<NewPatient>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fecha_nacimiento: "",
    dni: "",
    direccion: "",
    altura: 0,
    peso: 0,
  });

  // Función para obtener todos los pacientes
  const fetchPatients = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/paciente/`, {
        credentials: "include", // Incluir cookies para sesión
        headers: {
          "X-CSRFToken": getCSRFtoken() || "",
        }
      });
      if (!response.ok) {
        throw new Error("Error al obtener los pacientes");
      }
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      setError("Error al cargar los pacientes");
      console.error("Error fetching patients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para crear un nuevo paciente
  const createPatient = async (patientData: NewPatient) => {
    try {
      const response = await fetch(`${API_BASE_URL}/paciente/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFtoken() || "",
        },
        body: JSON.stringify(patientData),
        credentials: "include" 
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el paciente");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error creating patient:", error);
      throw error;
    }
  };

  // Función para actualizar un paciente
  const updatePatient = async (id: string, patientData: Partial<Patient>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/paciente/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFtoken() || "",
        },
        body: JSON.stringify(patientData),
        credentials: "include" 
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el paciente");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error updating patient:", error);
      throw error;
    }
  };

  // Función para eliminar un paciente
  const deletePatient = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/paciente/${id}/`, {
        method: "DELETE",
        credentials: "include", 
        headers: {
          "X-CSRFToken": getCSRFtoken() || "",
        } 
      });
      
      if (!response.ok) {
        throw new Error("Error al eliminar el paciente");
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
      throw error;
    }
  };

  // Cargar pacientes al montar el componente
  useEffect(() => {
    fetchPatients();
  }, []);

  // Filtrar pacientes según la búsqueda
  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      patient.nombre.toLowerCase().includes(searchLower) ||
      patient.apellido.toLowerCase().includes(searchLower) ||
      patient.email.toLowerCase().includes(searchLower) ||
      patient.dni.toLowerCase().includes(searchLower)
    );
  });

  // Manejar agregar nuevo paciente
  const handleAddPatient = async () => {
    if (!newPatient.nombre || !newPatient.apellido || !newPatient.email || !newPatient.dni) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }

    setIsSubmitting(true);
    try {
      const createdPatient = await createPatient(newPatient);
      setPatients([...patients, createdPatient]);
      setNewPatient({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        fecha_nacimiento: "",
        dni: "",
        direccion: "",
        altura: 0,
        peso: 0,
      });
      setShowAddModal(false);
      alert("Paciente agregado exitosamente");
    } catch (error) {
      alert(`Error al agregar paciente: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar actualizar paciente
  const handleUpdatePatient = async () => {
    if (!editingPatient) return;

    setIsSubmitting(true);
    try {
      const updatedPatient = await updatePatient(editingPatient.id, editingPatient);
      setPatients(
        patients.map((p) => (p.id === editingPatient.id ? updatedPatient : p))
      );
      setEditingPatient(null);
      alert("Paciente actualizado exitosamente");
    } catch (error) {
      alert(`Error al actualizar paciente: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar eliminar paciente
  const handleDeletePatient = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este paciente?")) {
      return;
    }

    try {
      await deletePatient(id);
      setPatients(patients.filter((p) => p.id !== id));
      alert("Paciente eliminado exitosamente");
    } catch (error) {
      alert(`Error al eliminar paciente: ${error}`);
    }
  };

  // Calcular edad
  const calculateAge = (birthDate: string) => {
    if (!birthDate) return "-";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return `${age} años`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Cargando pacientes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar pacientes</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchPatients}>Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-primary mr-2" />
              <h1 className="text-2xl font-semibold text-gray-900">
                Pacientes ({patients.length})
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
              placeholder="Buscar por nombre, apellido, email o DNI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredPatients.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? "No se encontraron pacientes" : "No hay pacientes registrados"}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery 
                  ? "Intenta con otros términos de búsqueda" 
                  : "Comienza agregando tu primer paciente"}
              </p>
              {!searchQuery && (
                <Button onClick={() => setShowAddModal(true)}>
                  <UserPlus className="h-5 w-5 mr-2" />
                  Agregar primer paciente
                </Button>
              )}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DNI
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Edad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Datos físicos
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center">
                          {patient.nombre[0]}{patient.apellido[0]}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.nombre} {patient.apellido}
                          </div>
                          <div className="text-sm text-gray-500">
                            {patient.direccion || "Sin dirección"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.dni}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Mail className="h-4 w-4 mr-1 text-gray-400" />
                        {patient.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Phone className="h-4 w-4 mr-1 text-gray-400" />
                        {patient.telefono || "Sin teléfono"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {calculateAge(patient.fecha_nacimiento)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {patient.fecha_nacimiento 
                          ? new Date(patient.fecha_nacimiento).toLocaleDateString('es-ES')
                          : "Sin fecha"
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {patient.altura > 0 ? `${patient.altura}m` : "-"} / {patient.peso > 0 ? `${patient.peso}kg` : "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setEditingPatient(patient)}
                        className="text-primary hover:text-primary-dark mr-3 p-1 rounded"
                        title="Editar paciente"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeletePatient(patient.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Eliminar paciente"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Nuevo Paciente
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                  disabled={isSubmitting}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre *"
                  value={newPatient.nombre}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, nombre: e.target.value })
                  }
                  placeholder="Nombre del paciente"
                  disabled={isSubmitting}
                />
                <Input
                  label="Apellidos *"
                  value={newPatient.apellido}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, apellido: e.target.value })
                  }
                  placeholder="Apellidos del paciente"
                  disabled={isSubmitting}
                />
                <Input
                  label="DNI *"
                  value={newPatient.dni}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, dni: e.target.value })
                  }
                  placeholder="12345678X"
                  disabled={isSubmitting}
                />
                <Input
                  label="Email *"
                  type="email"
                  value={newPatient.email}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, email: e.target.value })
                  }
                  placeholder="email@ejemplo.com"
                  disabled={isSubmitting}
                />
                <Input
                  label="Teléfono"
                  value={newPatient.telefono}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, telefono: e.target.value })
                  }
                  placeholder="+34 600 000 000"
                  disabled={isSubmitting}
                />
                <Input
                  label="Fecha de nacimiento"
                  type="date"
                  value={newPatient.fecha_nacimiento}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      fecha_nacimiento: e.target.value,
                    })
                  }
                  disabled={isSubmitting}
                />
                <Input
                  label="Altura (metros)"
                  type="number"
                  step="0.01"
                  value={newPatient.altura || ""}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      altura: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="1.75"
                  disabled={isSubmitting}
                />
                <Input
                  label="Peso (kg)"
                  type="number"
                  value={newPatient.peso || ""}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      peso: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="70"
                  disabled={isSubmitting}
                />
                <div className="md:col-span-2">
                  <Input
                    label="Dirección"
                    value={newPatient.direccion}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, direccion: e.target.value })
                    }
                    placeholder="Calle, número, ciudad..."
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowAddModal(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleAddPatient}
                isLoading={isSubmitting}
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Patient Modal */}
      {editingPatient && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Editar Paciente
                </h3>
                <button
                  onClick={() => setEditingPatient(null)}
                  className="text-gray-400 hover:text-gray-500"
                  disabled={isSubmitting}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre *"
                  value={editingPatient.nombre}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      nombre: e.target.value,
                    })
                  }
                  disabled={isSubmitting}
                />
                <Input
                  label="Apellidos *"
                  value={editingPatient.apellido}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      apellido: e.target.value,
                    })
                  }
                  disabled={isSubmitting}
                />
                <Input
                  label="DNI *"
                  value={editingPatient.dni}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      dni: e.target.value,
                    })
                  }
                  disabled={isSubmitting}
                />
                <Input
                  label="Email *"
                  type="email"
                  value={editingPatient.email}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      email: e.target.value,
                    })
                  }
                  disabled={isSubmitting}
                />
                <Input
                  label="Teléfono"
                  value={editingPatient.telefono}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      telefono: e.target.value,
                    })
                  }
                  disabled={isSubmitting}
                />
                <Input
                  label="Fecha de nacimiento"
                  type="date"
                  value={editingPatient.fecha_nacimiento}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      fecha_nacimiento: e.target.value,
                    })
                  }
                  disabled={isSubmitting}
                />
                <Input
                  label="Altura (metros)"
                  type="number"
                  step="0.01"
                  value={editingPatient.altura || ""}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      altura: parseFloat(e.target.value) || 0,
                    })
                  }
                  disabled={isSubmitting}
                />
                <Input
                  label="Peso (kg)"
                  type="number"
                  value={editingPatient.peso || ""}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      peso: parseFloat(e.target.value) || 0,
                    })
                  }
                  disabled={isSubmitting}
                />
                <div className="md:col-span-2">
                  <Input
                    label="Dirección"
                    value={editingPatient.direccion}
                    onChange={(e) =>
                      setEditingPatient({
                        ...editingPatient,
                        direccion: e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setEditingPatient(null)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleUpdatePatient}
                isLoading={isSubmitting}
              >
                Guardar cambios
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;