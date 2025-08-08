import React, { useState, useEffect } from 'react';
import { Plus, Search, FileText, Calendar, User, Edit3, Trash2, X, Save } from 'lucide-react';

// Interfaz específica para este componente con id como string para compatibilidad
interface Patient {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
}

interface Consulta {
  id: string;
  fecha: string;
  paciente: string;
  paciente_nombre?: string;
  virtual: boolean;
}

// ✅ Actualizar la interfaz Note para reflejar solo los campos del modelo
interface Note {
  id: string;
  contenido: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  consulta: string; // Solo el ID de la consulta
}

interface NewNote {
  contenido: string;
  consulta: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

// ✅ Función simplificada para obtener CSRF token solo desde cookies
const getCSRFTokenFromCookie = (): string | null => {
  const name = 'csrftoken';
  let cookieValue = null;
  
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  
  return cookieValue;
};

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [filteredConsultas, setFilteredConsultas] = useState<Consulta[]>([]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<NewNote>({
    contenido: "",
    consulta: ""
  });

  // Cargar datos iniciales
  useEffect(() => {
    loadInitialData();
  }, []);

  // Filtrar consultas cuando cambia el paciente seleccionado
  useEffect(() => {
    if (selectedPatient) {
      const consultasPaciente = consultas.filter(c => c.paciente === selectedPatient);
      setFilteredConsultas(consultasPaciente);
    } else {
      setFilteredConsultas(consultas);
    }
  }, [selectedPatient, consultas]);

  // Filtrar notas según búsqueda
  const filteredNotes = notes.filter(note => {
    const consulta = consultas.find(c => c.id === note.consulta);
    const patient = consulta ? patients.find(p => p.id === consulta.paciente) : null;
    const patientFullName = patient ? `${patient.nombre} ${patient.apellido}` : '';
    
    // Búsqueda por contenido o nombre
    const matchesSearch = !searchQuery || 
                         note.contenido.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patientFullName.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtro por paciente - convertir ambos a string para comparar
    const matchesPatient = !selectedPatient || 
                          (consulta && String(consulta.paciente) === String(selectedPatient));
    
    return matchesSearch && matchesPatient;
  });

  const loadInitialData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchNotes(),
        fetchPatients(),
        fetchConsultas()
      ]);
    } catch (error) {
      setError('Error al cargar los datos iniciales');
      console.error('Error loading initial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotes = async () => {
    try {
      const csrfToken = getCSRFTokenFromCookie();
      
      const response = await fetch(`${API_BASE_URL}/nota/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRFToken': csrfToken }),
        },
        credentials: 'include',
      });
      
      if (!response.ok) throw new Error('Error al obtener notas');
      
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  };

  const fetchPatients = async () => {
    try {
      const csrfToken = getCSRFTokenFromCookie();
      
      const response = await fetch(`${API_BASE_URL}/paciente/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRFToken': csrfToken }),
        },
        credentials: 'include',
      });
      
      if (!response.ok) throw new Error('Error al obtener pacientes');
      
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  };

  const fetchConsultas = async () => {
    try {
      const csrfToken = getCSRFTokenFromCookie();
      
      const response = await fetch(`${API_BASE_URL}/consulta/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRFToken': csrfToken }),
        },
        credentials: 'include',
      });
      
      if (!response.ok) throw new Error('Error al obtener consultas');
      
      const data = await response.json();
      setConsultas(data);
    } catch (error) {
      console.error('Error fetching consultas:', error);
      throw error;
    }
  };

  const createNote = async (noteData: NewNote) => {
    try {
      const csrfToken = getCSRFTokenFromCookie();
      
      const response = await fetch(`${API_BASE_URL}/nota/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken && { "X-CSRFToken": csrfToken }),
        },
        body: JSON.stringify(noteData),
        credentials: "include" 
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear la nota");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  };

  const updateNote = async (id: string, noteData: Partial<Note>) => {
    try {
      const csrfToken = getCSRFTokenFromCookie();
      
      const response = await fetch(`${API_BASE_URL}/nota/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken && { "X-CSRFToken": csrfToken }),
        },
        body: JSON.stringify(noteData),
        credentials: "include" 
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar la nota");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const csrfToken = getCSRFTokenFromCookie();
      
      const response = await fetch(`${API_BASE_URL}/nota/${id}/`, {
        method: "DELETE",
        headers: {
          ...(csrfToken && { "X-CSRFToken": csrfToken }),
        },
        credentials: "include" 
      });
      
      if (!response.ok) {
        throw new Error("Error al eliminar la nota");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.contenido.trim() || !formData.consulta) {
      alert("Por favor complete todos los campos");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingNote) {
        await updateNote(editingNote.id, formData);
        setNotes(notes.map(note => 
          note.id === editingNote.id 
            ? { ...note, ...formData }
            : note
        ));
        alert("Nota actualizada exitosamente");
      } else {
        const newNote = await createNote(formData);
        setNotes([newNote, ...notes]);
        alert("Nota creada exitosamente");
      }
      
      resetForm();
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      contenido: note.contenido,
      consulta: note.consulta
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Está seguro de eliminar esta nota?")) return;

    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
      alert("Nota eliminada exitosamente");
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const resetForm = () => {
    setFormData({ contenido: "", consulta: "" });
    setEditingNote(null);
    setShowAddModal(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Función para obtener el nombre del paciente de una consulta
  const getPatientNameFromConsulta = (consultaId: string) => {
    const consulta = consultas.find(c => c.id === consultaId);
    if (consulta) {
      const patient = patients.find(p => p.id === consulta.paciente);
      return patient ? `${patient.nombre} ${patient.apellido}` : 'Paciente desconocido';
    }
    return 'N/A';
  };

  // Función para obtener la fecha de una consulta
  const getConsultaDate = (consultaId: string) => {
    const consulta = consultas.find(c => c.id === consultaId);
    return consulta ? consulta.fecha : null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              Notas de Consulta
              <span className="text-lg text-gray-500">({filteredNotes.length})</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Gestiona las notas de las consultas de tus pacientes
              {selectedPatient && (
                <span className="block text-sm text-blue-600 mt-1">
                  📍 Filtrado por: {patients.find(p => p.id === selectedPatient)?.nombre || 'Paciente'} ({selectedPatient})
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            Nueva Nota
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Buscador */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en notas o por nombre de paciente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Filtro por paciente */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedPatient || ""}
                onChange={(e) => setSelectedPatient(e.target.value || null)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white"
              >
                <option value="">Todos los pacientes</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.nombre} {patient.apellido}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de notas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredNotes.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay notas</h3>
              <p className="text-gray-500">
                {searchQuery || selectedPatient ? 'No se encontraron notas con los filtros actuales' : 'Aún no has creado ninguna nota'}
              </p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div key={note.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {formatDate(note.fecha_creacion)}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-900 text-sm leading-relaxed line-clamp-4">
                    {note.contenido}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="text-xs text-gray-500">
                    <p className="mb-1">
                      <span className="font-medium">Paciente:</span> {getPatientNameFromConsulta(note.consulta)}
                    </p>
                    <p>
                      <span className="font-medium">Consulta:</span> {getConsultaDate(note.consulta) ? formatDate(getConsultaDate(note.consulta)!) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal para agregar/editar nota */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingNote ? 'Editar Nota' : 'Nueva Nota'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Selector de consulta */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consulta *
                  </label>
                  <select
                    value={formData.consulta}
                    onChange={(e) => setFormData({ ...formData, consulta: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="">Seleccionar consulta</option>
                    {filteredConsultas.map((consulta) => {
                      const patient = patients.find(p => p.id === consulta.paciente);
                      return (
                        <option key={consulta.id} value={consulta.id}>
                          {formatDate(consulta.fecha)} - {patient ? `${patient.nombre} ${patient.apellido}` : `Paciente ID: ${consulta.paciente}`}
                          {consulta.virtual && ' (Virtual)'}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Contenido de la nota */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contenido de la nota *
                  </label>
                  <textarea
                    value={formData.contenido}
                    onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    rows={8}
                    placeholder="Escriba el contenido de la nota aquí..."
                    required
                  />
                </div>

                {/* Botones */}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="h-4 w-4" />
                    {isSubmitting ? 'Guardando...' : editingNote ? 'Actualizar' : 'Crear'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
