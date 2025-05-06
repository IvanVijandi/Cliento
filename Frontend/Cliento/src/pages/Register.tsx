function Register() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Registrarse
        </h2>
        <form>
          {/* Campo de correo electrónico */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu correo"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>

          {/* Campo de contraseña */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>

          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:outline-none"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
