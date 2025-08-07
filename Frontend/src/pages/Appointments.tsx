import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Plus,
  Edit2,
  Trash2,
  X,
  Video,
  MapPin,
  AlertCircle,
  Loader,
  Search,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
} from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import Button from "../components/ui/Button";

// Interfaces simplificadas
interface Consulta {
  id: string;
  fecha: string;
  profesional: number;
  consultorio: number;
  paciente: number;
  virtual: boolean;
  paciente_nombre?: string;
  paciente_apellido?: string;
  consultorio_direccion?: string;
}

interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
}

interface Consultorio {
  id: string;
  direccion: string;
}

interface NewConsulta {
  fecha: string;
  profesional: number;
  consultorio: number;
  paciente: number;
  virtual: boolean;
}
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


const Appointments: React.FC = () => {
  
  const API_BASE_URL = import.meta.env.VITE_API_URL ;
  console.log(getCSRFtoken());

  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [consultorios, setConsultorios] = useState<Consultorio[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingConsulta, setEditingConsulta] = useState<Consulta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [formData, setFormData] = useState<NewConsulta>({
    fecha: "",
    profesional: 1,
    consultorio: 1,
    paciente: 0,
    virtual: false,
  });
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Función para obtener datos (usando variable de entorno)
  const fetchData = async (endpoint: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFtoken() || "",
        },
        credentials: 'include',
      });
      if (!response.ok) throw new Error(`Error al obtener ${endpoint}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  };

  // Cargar todos los datos
  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [consultasData, pacientesData, consultoriosData] = await Promise.all([
        fetchData('consulta'),
        fetchData('paciente'),
        fetchData('consultorio')
      ]);

      // Enriquecer consultas
      const consultasEnriquecidas = consultasData.map((consulta: any) => {
        const paciente = pacientesData.find((p: Paciente) => 
          p.id.toString() === consulta.paciente.toString()
        );
        const consultorio = consultoriosData.find((c: Consultorio) => 
          c.id.toString() === consulta.consultorio.toString()
        );
        
        return {
          ...consulta,
          id: consulta.id.toString(),
          paciente_nombre: paciente?.nombre || 'Paciente',
          paciente_apellido: paciente?.apellido || 'Desconocido',
          consultorio_direccion: consultorio?.direccion || 'Consultorio'
        };
      });

      setConsultas(consultasEnriquecidas);
      setPacientes(pacientesData);
      setConsultorios(consultoriosData);
    } catch (error) {
      setError('Error al cargar los datos');
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // CRUD Operations (usando variable de entorno)
  const saveConsulta = async () => {
    if (!formData.fecha || !formData.paciente) {
      alert("Por favor, complete los campos obligatorios");
      return;
    }

    setIsSubmitting(true);
    try {
      const url = editingConsulta 
        ? `${API_BASE_URL}/consulta/${editingConsulta.id}/`
        : `${API_BASE_URL}/consulta/`;
      
      const method = editingConsulta ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: { "Content-Type": "application/json",
          "X-CSRFToken": getCSRFtoken() || "",    
         },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error("Error al guardar la consulta");
      
      const savedConsulta = await response.json();
      
      // Enriquecer la consulta guardada
      const paciente = pacientes.find(p => p.id.toString() === formData.paciente.toString());
      const consultorio = consultorios.find(c => c.id.toString() === formData.consultorio.toString());
      
      const consultaEnriquecida = {
        ...savedConsulta,
        id: savedConsulta.id.toString(),
        paciente_nombre: paciente?.nombre || 'Paciente',
        paciente_apellido: paciente?.apellido || 'Desconocido',
        consultorio_direccion: consultorio?.direccion || 'Consultorio'
      };

      if (editingConsulta) {
        setConsultas(consultas.map(c => c.id === editingConsulta.id ? consultaEnriquecida : c));
      } else {
        setConsultas([...consultas, consultaEnriquecida]);
      }

      closeModal();
      alert(editingConsulta ? "Consulta actualizada" : "Consulta creada");
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteConsulta = async (id: string) => {
    if (!window.confirm("¿Eliminar esta consulta?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/consulta/${id}/`, {
        method: "DELETE",
        credentials: "include", 
        headers: {
          "X-CSRFToken": getCSRFtoken() || "",
        }
      });
      
      if (!response.ok) throw new Error("Error al eliminar");
      
      setConsultas(consultas.filter(c => c.id !== id));
      alert("Consulta eliminada");
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  // Modal handlers
  const openModal = (consulta?: Consulta) => {
    if (consulta) {
      setEditingConsulta(consulta);
      setFormData({
        fecha: consulta.fecha,
        profesional: consulta.profesional,
        consultorio: consulta.consultorio,
        paciente: consulta.paciente,
        virtual: consulta.virtual,
      });
    } else {
      setEditingConsulta(null);
      setFormData({
        fecha: "",
        profesional: 1,
        consultorio: consultorios[0]?.id ? Number(consultorios[0].id) : 1,
        paciente: 0,
        virtual: false,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingConsulta(null);
  };

  // Filtrar consultas
  const filteredConsultas = consultas.filter(consulta => {
    const searchLower = searchQuery.toLowerCase();
    return (
      consulta.paciente_nombre?.toLowerCase().includes(searchLower) ||
      consulta.paciente_apellido?.toLowerCase().includes(searchLower) ||
      consulta.consultorio_direccion?.toLowerCase().includes(searchLower)
    );
  });

  // Formatear fecha
  const formatFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);
    return {
      fecha: format(fecha, "dd/MM/yyyy"),
      hora: format(fecha, "HH:mm")
    };
  };

  // Obtener consultas por fecha
  const getConsultasByDate = (date: Date) => {
    return filteredConsultas.filter(consulta => 
      isSameDay(new Date(consulta.fecha), date)
    );
  };

  // Obtener días del mes actual
  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  };

  // Navegar meses
  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  useEffect(() => {
    loadData();
  }, []);

  // Log para verificar que la variable se está usando correctamente
  useEffect(() => {
    console.log('API Base URL:', API_BASE_URL);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Cargando consultas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadData}>Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con toggle de vista */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Consultas</h1>
              <p className="text-gray-600 mt-1">{consultas.length} consultas programadas</p>
            </div>
            <div className="flex items-center space-x-3">
              {/* Toggle de vista */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'calendar' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Calendario
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="h-4 w-4 mr-2" />
                  Lista
                </button>
              </div>
              <Button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Consulta
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Debug info (opcional - puedes quitar en producción) */}
      {import.meta.env.DEV && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 m-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Debug:</strong> API URL configurada como: <code className="bg-yellow-100 px-1 rounded">{API_BASE_URL}</code>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por paciente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Vista Calendario */}
        {viewMode === 'calendar' ? (
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Header del calendario */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {format(currentMonth, "MMMM yyyy", { locale: es })}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Hoy
                </button>
                <button
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                <div key={day} className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid del calendario */}
            <div className="grid grid-cols-7">
              {getDaysInMonth().map(day => {
                const consultasDelDia = getConsultasByDate(day);
                const esHoy = isToday(day);
                const estaSeleccionado = selectedDate && isSameDay(day, selectedDate);
                
                return (
                  <div
                    key={day.toString()}
                    className={`min-h-[120px] border-r border-b border-gray-100 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                      esHoy ? 'bg-blue-50' : ''
                    } ${estaSeleccionado ? 'bg-blue-100' : ''}`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className={`text-sm font-medium mb-2 ${
                      esHoy ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {format(day, 'd')}
                      {esHoy && (
                        <span className="ml-1 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    
                    {/* Consultas del día */}
                    <div className="space-y-1">
                      {consultasDelDia.slice(0, 2).map(consulta => (
                        <div
                          key={consulta.id}
                          className={`text-xs p-1 rounded truncate cursor-pointer ${
                            consulta.virtual
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(consulta);
                          }}
                          title={`${consulta.paciente_nombre} ${consulta.paciente_apellido} - ${format(new Date(consulta.fecha), 'HH:mm')}`}
                        >
                          <div className="flex items-center">
                            {consulta.virtual ? (
                              <Video className="h-3 w-3 mr-1 flex-shrink-0" />
                            ) : (
                              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                            )}
                            <span className="truncate">
                              {format(new Date(consulta.fecha), 'HH:mm')} {consulta.paciente_nombre}
                            </span>
                          </div>
                        </div>
                      ))}
                      {consultasDelDia.length > 2 && (
                        <div className="text-xs text-gray-500 font-medium">
                          +{consultasDelDia.length - 2} más
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Vista Lista - mismo código anterior */
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {filteredConsultas.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchQuery ? "No se encontraron consultas" : "No hay consultas programadas"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery ? "Intenta con otros términos de búsqueda" : "Programa tu primera consulta"}
                </p>
                {!searchQuery && (
                  <Button onClick={() => openModal()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Consulta
                  </Button>
                )}
              </div>
            ) : (
              <>
                {/* Header de la tabla */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 uppercase tracking-wide">
                    <div className="col-span-3 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Paciente
                    </div>
                    <div className="col-span-2 flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Fecha
                    </div>
                    <div className="col-span-2 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Hora
                    </div>
                    <div className="col-span-2">
                      Modalidad
                    </div>
                    <div className="col-span-2">
                      Ubicación
                    </div>
                    <div className="col-span-1 text-center">
                      Acciones
                    </div>
                  </div>
                </div>

                {/* Filas de la tabla */}
                <div className="divide-y divide-gray-100">
                  {filteredConsultas
                    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
                    .map((consulta) => {
                      const { fecha, hora } = formatFecha(consulta.fecha);
                      const fechaConsulta = new Date(consulta.fecha);
                      const ahora = new Date();
                      const esPasada = fechaConsulta < ahora;
                      
                      return (
                        <div 
                          key={consulta.id} 
                          className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
                            esPasada ? 'bg-gray-50/50 opacity-75' : ''
                          }`}
                        >
                          <div className="grid grid-cols-12 gap-4 items-center">
                            {/* Paciente */}
                            <div className="col-span-3">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
                                  {consulta.paciente_nombre?.[0]?.toUpperCase()}{consulta.paciente_apellido?.[0]?.toUpperCase()}
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">
                                    {consulta.paciente_nombre} {consulta.paciente_apellido}
                                  </p>
                                  {esPasada && (
                                    <p className="text-xs text-gray-500">Consulta realizada</p>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Fecha */}
                            <div className="col-span-2">
                              <p className="text-sm font-medium text-gray-900">{fecha}</p>
                              <p className="text-xs text-gray-500">
                                {format(fechaConsulta, "EEEE", { locale: es })}
                              </p>
                            </div>

                            {/* Hora */}
                            <div className="col-span-2">
                              <p className="text-sm font-medium text-gray-900">{hora}</p>
                              <p className="text-xs text-gray-500">
                                {esPasada ? 'Finalizada' : 'Programada'}
                              </p>
                            </div>

                            {/* Modalidad */}
                            <div className="col-span-2">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                consulta.virtual 
                                  ? "bg-blue-100 text-blue-800" 
                                  : "bg-green-100 text-green-800"
                              }`}>
                                {consulta.virtual ? (
                                  <>
                                    <Video className="h-3 w-3 mr-1" />
                                    Virtual
                                  </>
                                ) : (
                                  <>
                                    <MapPin className="h-3 w-3 mr-1" />
                                    Presencial
                                  </>
                                )}
                              </span>
                            </div>

                            {/* Ubicación */}
                            <div className="col-span-2">
                              <p className="text-sm text-gray-700">
                                {consulta.virtual ? (
                                  <span className="text-blue-600 font-medium">Videollamada</span>
                                ) : (
                                  <span className="truncate" title={consulta.consultorio_direccion}>
                                    📍 {consulta.consultorio_direccion}
                                  </span>
                                )}
                              </p>
                            </div>

                            {/* Acciones */}
                            <div className="col-span-1 flex justify-center space-x-1">
                              <button
                                onClick={() => openModal(consulta)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Editar consulta"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteConsulta(consulta.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar consulta"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Footer de la tabla */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>
                      Total: {filteredConsultas.length} consulta{filteredConsultas.length !== 1 ? 's' : ''}
                    </span>
                    <span>
                      {filteredConsultas.filter(c => new Date(c.fecha) > new Date()).length} pendiente{filteredConsultas.filter(c => new Date(c.fecha) > new Date()).length !== 1 ? 's' : ''} • {' '}
                      {filteredConsultas.filter(c => new Date(c.fecha) < new Date()).length} realizada{filteredConsultas.filter(c => new Date(c.fecha) < new Date()).length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Panel lateral para fecha seleccionada (solo en vista calendario) */}
        {viewMode === 'calendar' && selectedDate && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Consultas del {format(selectedDate, "d 'de' MMMM, yyyy", { locale: es })}
            </h3>
            {getConsultasByDate(selectedDate).length === 0 ? (
              <p className="text-gray-500">No hay consultas programadas para este día.</p>
            ) : (
              <div className="space-y-3">
                {getConsultasByDate(selectedDate).map(consulta => (
                  <div key={consulta.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-8 w-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-xs">
                        {consulta.paciente_nombre?.[0]?.toUpperCase()}{consulta.paciente_apellido?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {consulta.paciente_nombre} {consulta.paciente_apellido}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(consulta.fecha), 'HH:mm')} • {consulta.virtual ? 'Virtual' : 'Presencial'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => openModal(consulta)}
                        className="p-1 text-gray-400 hover:text-blue-600 rounded"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteConsulta(consulta.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal - mantener el mismo código anterior */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingConsulta ? "Editar Consulta" : "Nueva Consulta"}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={isSubmitting}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 space-y-4">
              {/* Paciente */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paciente *
                </label>
                <select
                  value={formData.paciente}
                  onChange={(e) => setFormData({...formData, paciente: Number(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isSubmitting}
                >
                  <option value={0}>Seleccionar paciente</option>
                  {pacientes.map((paciente) => (
                    <option key={paciente.id} value={Number(paciente.id)}>
                      {paciente.nombre} {paciente.apellido}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fecha y hora */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha y hora *
                </label>
                <input
                  type="datetime-local"
                  value={formData.fecha}
                  onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isSubmitting}
                />
              </div>

              {/* Tipo de consulta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de consulta
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={!formData.virtual}
                      onChange={() => setFormData({...formData, virtual: false})}
                      className="mr-2"
                      disabled={isSubmitting}
                    />
                    <span className="text-sm">Presencial</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={formData.virtual}
                      onChange={() => setFormData({...formData, virtual: true})}
                      className="mr-2"
                      disabled={isSubmitting}
                    />
                    <span className="text-sm">Virtual</span>
                  </label>
                </div>
              </div>

              {/* Consultorio (solo si es presencial) */}
              {!formData.virtual && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Consultorio
                  </label>
                  <select
                    value={formData.consultorio}
                    onChange={(e) => setFormData({...formData, consultorio: Number(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                  >
                    {consultorios.map((consultorio) => (
                      <option key={consultorio.id} value={Number(consultorio.id)}>
                        {consultorio.direccion}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={closeModal}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                onClick={saveConsulta}
                isLoading={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editingConsulta ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;