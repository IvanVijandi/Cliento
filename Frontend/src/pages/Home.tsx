import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
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
        <section className="bg-gradient-to-r from-primary-light/10 to-secondary-light/20 py-20 min-h-[80vh] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-8 animate-slide-up">
                <div className="flex items-center space-x-3 mb-6">
                  <Brain className="h-12 w-12 text-primary" />
                  <span className="text-3xl font-bold text-gray-900">Cliento</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Gestión Simple para Profesionales de Salud Mental
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                  La plataforma intuitiva que necesitas para gestionar pacientes, 
                  programar consultas y organizar notas de sesión de forma segura.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/register">
                    <Button size="lg" className="text-lg px-8 py-4">
                      Comenzar Ahora
                      <ChevronRight className="ml-2 h-6 w-6" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                      Iniciar Sesión
                    </Button>
                  </Link>
                </div>

                <div className="pt-8">
                  <p className="text-sm text-gray-500 mb-4">Características principales:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-700">Gestión de pacientes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-700">Programación de citas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-700">Notas de sesión</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2 mt-8 lg:mt-0 animate-fade-in">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-25"></div>
                  <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg"
                      alt="Profesional de salud mental trabajando"
                      className="w-full h-auto rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Confianza de Profesionales
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Únete a profesionales que ya están optimizando su práctica con Cliento.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic text-lg leading-relaxed">
                    "Cliento ha revolucionado la forma en que gestiono mi práctica. 
                    La interfaz es intuitiva y he ahorrado horas en tareas administrativas."
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    JD
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Dra. Juana Díaz
                    </h4>
                    <p className="text-gray-500">Psicóloga Clínica</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic text-lg leading-relaxed">
                    "Las funciones de gestión de pacientes son excelentes. 
                    Puedo seguir fácilmente el progreso y mantener notas detalladas."
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    MS
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Marco Sánchez
                    </h4>
                    <p className="text-gray-500">Terapeuta Licenciado</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic text-lg leading-relaxed">
                    "El sistema de programación ha reducido las faltas significativamente. 
                    Se paga solo con el tiempo ahorrado."
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                    EL
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Dra. Elena López
                    </h4>
                    <p className="text-gray-500">Psiquiatra</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section simplificado */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              ¿Listo para Comenzar?
            </h2>
            <p className="text-xl md:text-2xl mb-10 leading-relaxed opacity-90">
              Simplifica la gestión de tu práctica profesional con Cliento.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 text-lg px-10 py-4 font-semibold"
                >
                  Registrarse Gratis
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 text-lg px-10 py-4 font-semibold"
                >
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-sm opacity-75">
                ✓ Registro en minutos &nbsp;•&nbsp; ✓ Datos seguros &nbsp;•&nbsp; ✓ Fácil de usar
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;