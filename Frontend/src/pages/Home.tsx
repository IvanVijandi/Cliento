import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Users,
  Calendar,
  ClipboardCheck,
  ShieldCheck,
  BarChart2,
  Brain,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-light/10 to-secondary-light/20 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6 animate-slide-up">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Optimiza tu Práctica de Salud Mental
                </h1>
                <p className="text-xl text-gray-600">
                  Cliento ayuda a profesionales de la salud mental a gestionar
                  clientes, programar citas y almacenar notas de sesión de forma
                  segura en una plataforma intuitiva.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg">
                      Comenzar
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg">
                      Iniciar Sesión
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 mt-8 lg:mt-0 animate-fade-in">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25"></div>
                  <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg"
                      alt="Profesional de salud mental con cliente"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                Diseñado para Profesionales de Salud Mental
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Nuestra plataforma integral simplifica la gestión de tu práctica,
                dándote más tiempo para enfocarte en lo que más importa: tus
                clientes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Gestión de Clientes
                </h3>
                <p className="text-gray-600">
                  Mantén perfiles detallados de clientes con información de
                  contacto, historial y notas personalizadas en un entorno seguro.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-secondary-light/20 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Programación de Citas
                </h3>
                <p className="text-gray-600">
                  Programa y gestiona citas fácilmente con recordatorios
                  automáticos para reducir las faltas.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mb-4">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Notas de Sesión
                </h3>
                <p className="text-gray-600">
                  Crea y almacena notas de sesión estructuradas con plantillas
                  personalizadas para seguir el progreso y planes de tratamiento.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-secondary-light/20 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Seguro y Conforme
                </h3>
                <p className="text-gray-600">
                  Ten tranquilidad sabiendo que los datos de tus clientes están
                  protegidos con seguridad y estándares de cumplimiento
                  empresariales.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Estadísticas y Análisis
                </h3>
                <p className="text-gray-600">
                  Obtén información valiosa sobre tu práctica con análisis del
                  progreso de clientes, tasas de asistencia y más.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-secondary-light/20 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Interfaz Intuitiva
                </h3>
                <p className="text-gray-600">
                  Disfruta de una interfaz bellamente diseñada que hace que
                  gestionar tu práctica sea un placer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                Confianza de Profesionales de Salud Mental
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Mira lo que otros profesionales dicen sobre nuestra plataforma.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic mb-4">
                  "Cliento ha revolucionado la forma en que gestiono mi práctica
                  de terapia. La interfaz es intuitiva y he ahorrado horas en
                  tareas administrativas."
                </p>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Dra. Juana Díaz
                    </h4>
                    <p className="text-sm text-gray-500">
                      Psicóloga Clínica
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic mb-4">
                  "Las funciones de gestión de clientes son excelentes. Puedo
                  seguir fácilmente el progreso y mantener notas detalladas que
                  me ayudan a brindar mejor atención."
                </p>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-secondary rounded-full flex items-center justify-center text-white font-semibold">
                    MS
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Marco Sánchez
                    </h4>
                    <p className="text-sm text-gray-500">Terapeuta Licenciado</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic mb-4">
                  "Solo el sistema de programación ha reducido las faltas en un
                  40%. Esta plataforma se paga sola con el tiempo ahorrado y la
                  mejora en eficiencia."
                </p>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-accent rounded-full flex items-center justify-center text-white font-semibold">
                    EL
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Dra. Elena López
                    </h4>
                    <p className="text-sm text-gray-500">Psiquiatra</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              ¿Listo para Transformar tu Práctica?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Únete a miles de profesionales de salud mental que han optimizado
              su práctica con Cliento.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Prueba Gratuita
                </Button>
              </Link>
              <Link to="#contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Contactar Ventas
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
