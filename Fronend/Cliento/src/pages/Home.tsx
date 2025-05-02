import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Barra superior */}
      <Navbar />

      {/* Hero Section */}
      <div className="bg-black py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-white mb-4">
            Bienvenido a Cliento
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            La solución ideal para gestionar tus clientes en el área de salud
            mental.
          </p>
          <button className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition">
            Comienza Ahora
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h2 className="text-3xl font-bold text-black mb-6">
          Funcionalidades principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            title="Gestión de Citas"
            description="Organiza y administra las citas de tus pacientes de manera sencilla."
          />
          <Card
            title="Registro de Pacientes"
            description="Lleva un registro detallado de la información de tus pacientes."
          />
          <Card
            title="Informes Personalizados"
            description="Genera informes personalizados para analizar el progreso de tus pacientes."
          />
        </div>
      </div>

      {/* Testimonios */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-black text-center mb-8">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-700 italic">
                "Cliento ha transformado la forma en que gestiono mis pacientes.
                Es fácil de usar y muy eficiente."
              </p>
              <p className="text-gray-500 font-bold mt-4">- Dr. Juan Pérez</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-700 italic">
                "Gracias a Cliento, puedo organizar mis citas y mantener un
                registro detallado de mis pacientes."
              </p>
              <p className="text-gray-500 font-bold mt-4">- Lic. Ana Gómez</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-700 italic">
                "La mejor herramienta para profesionales de la salud mental. ¡La
                recomiendo totalmente!"
              </p>
              <p className="text-gray-500 font-bold mt-4">
                - Psic. María López
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-black py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-gray-300 mb-6">
            Regístrate ahora y lleva tu gestión de clientes al siguiente nivel.
          </p>
          <button className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition">
            Registrarse
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
