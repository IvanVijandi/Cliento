import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-black shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo o título */}
        <h1 className="text-xl font-bold text-white">Cliento</h1>

        {/* Enlaces de navegación */}
        <div className="space-x-4">
          <Link
            to="/login"
            className="text-gray-300 font-medium hover:text-white transition"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="text-gray-300 font-medium hover:text-white transition"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
