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
        {/* Sección Hero */}
        <section className="bg-gradient-to-r from-primary-light/10 to-secondary-light/20 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6 animate-slide-up">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Optimiza tu práctica de salud mental
                </h1>
                <p className="text-xl text-gray-600">
                  MindTrack ayuda a los profesionales de la salud mental a
                  gestionar clientes, programar citas y almacenar notas de
                  sesiones de manera segura en una plataforma intuitiva.
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
                      Iniciar sesión
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

        {/* Sección de Funcionalidades */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                Diseñado para profesionales de la salud mental
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Nuestra plataforma integral optimiza la gestión de tu práctica,
                dándote más tiempo para enfocarte en lo que más importa: tus
                clientes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Funcionalidad 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Gestión de Clientes
                </h3>
                <p className="text-gray-600">
                  Mantén perfiles detallados de clientes con información de
                  contacto, historial y notas personalizadas en un entorno
                  seguro.
                </p>
              </div>

              {/* Funcionalidad 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-secondary-light/20 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Programación de Citas
                </h3>
                <p className="text-gray-600">
                  Programa y gestiona citas fácilmente con recordatorios
                  automáticos para reducir ausencias.
                </p>
              </div>

              {/* Funcionalidad 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mb-4">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Notas de Sesión
                </h3>
                <p className="text-gray-600">
                  Crea y almacena notas estructuradas de sesiones con plantillas
                  personalizadas para seguir el progreso y los planes de
                  tratamiento.
                </p>
              </div>

              {/* Funcionalidad 4 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-secondary-light/20 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Seguro y Cumplimiento
                </h3>
                <p className="text-gray-600">
                  Ten la tranquilidad de que los datos de tus clientes están
                  protegidos con estándares de seguridad de nivel empresarial.
                </p>
              </div>

              {/* Funcionalidad 5 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Análisis e Informes
                </h3>
                <p className="text-gray-600">
                  Obtén información valiosa sobre tu práctica con análisis de
                  progreso de clientes, tasas de asistencia y más.
                </p>
              </div>

              {/* Funcionalidad 6 */}
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

        {/* Continúa con las demás secciones traducidas */}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
