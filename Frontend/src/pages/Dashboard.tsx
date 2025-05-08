import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Search, UserPlus, Calendar, Brain, Clock } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Dashboard: React.FC = () => {
  const [selected, setSelected] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]); // Estado para almacenar pacientes
  const [consultas, setConsultas] = useState([]); // Estado para almacenar consultas
  const [loadingPatients, setLoadingPatients] = useState(false); // Estado para manejar la carga de pacientes
  const [loadingConsultas, setLoadingConsultas] = useState(false); // Estado para manejar la carga de consultas

  // Obtener pacientes desde el backend
  useEffect(() => {
    const fetchPatients = async () => {
      setLoadingPatients(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/paciente/");
        if (response.ok) {
          const data = await response.json();
          setPatients(data); // Actualizar el estado con los pacientes obtenidos
        } else {
          console.error("Error al obtener pacientes:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, []);

  // Obtener consultas desde el backend
  useEffect(() => {
    const fetchConsultas = async () => {
      setLoadingConsultas(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/consulta/");
        if (response.ok) {
          const data = await response.json();
          setConsultas(data); // Actualizar el estado con las consultas obtenidas
        } else {
          console.error("Error al obtener consultas:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      } finally {
        setLoadingConsultas(false);
      }
    };

    fetchConsultas();
  }, []);

  // Filtrar pacientes según el término de búsqueda
  const filteredPatients = patients.filter((patient: any) =>
    patient.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-primary font-semibold text-xl">
                Consultorio Virtual
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sección del Calendario */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Agenda de Consultas
                </h2>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Programar Consulta
                </Button>
              </div>
              <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="lg:w-1/2">
                  <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected as any}
                    locale={es}
                    className="border rounded-lg p-6 bg-white shadow-sm w-full"
                    classNames={{
                      day_selected: "bg-primary text-white font-bold",
                      day_today: "font-bold text-primary",
                      day: "text-lg h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center rounded-full hover:bg-primary-light/20 transition-colors",
                      caption: "text-lg font-semibold mb-4",
                      nav_button_previous:
                        "text-primary hover:text-primary-dark",
                      nav_button_next: "text-primary hover:text-primary-dark",
                    }}
                  />
                </div>
                <div className="lg:w-1/2 mt-6 lg:mt-0">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">
                    {format(selected, "EEEE d 'de' MMMM 'de' yyyy", {
                      locale: es,
                    })}
                  </h3>
                  <div className="space-y-4">
                    {loadingConsultas ? (
                      <p className="text-gray-500">Cargando consultas...</p>
                    ) : consultas.length > 0 ? (
                      consultas.map((consulta: any) => (
                        <div
                          key={consulta.id}
                          className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <h4 className="font-medium">{consulta.titulo}</h4>
                          <p className="text-sm text-gray-500">
                            {}
                            {consulta.id || "Sin descripción"}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No se encontraron consultas.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel lateral */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Mis Pacientes
                </h2>
                <Button onClick={() => console.log("Agregar paciente")}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Nuevo Paciente
                </Button>
              </div>
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
              <div className="mt-6 space-y-4">
                {loadingPatients ? (
                  <p className="text-gray-500">Cargando pacientes...</p>
                ) : filteredPatients.length > 0 ? (
                  filteredPatients.map((patient: any) => (
                    <div
                      key={patient.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <h4 className="font-medium">{patient.nombre}</h4>
                      <p className="text-sm text-gray-500">
                        {patient.email || "Sin correo"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No se encontraron pacientes.</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Resumen del Día
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary-light/10 rounded-lg">
                  <p className="text-sm text-gray-600">Consultas Hoy</p>
                  <p className="text-2xl font-semibold text-primary">
                    {consultas.length}
                  </p>
                </div>
                <div className="p-4 bg-primary-light/10 rounded-lg">
                  <p className="text-sm text-gray-600">Pacientes Activos</p>
                  <p className="text-2xl font-semibold text-primary">
                    {patients.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
