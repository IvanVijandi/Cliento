import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import useAuth from "./hooks/useAuth"; // Importa el hook

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Patients = lazy(() => import("./pages/Patients"));
const Appointments = lazy(() => import("./pages/Appointments"));

import { Navigate, Outlet } from "react-router-dom";

// Componente para rutas protegidas usando el hook
function PrivateRoute() {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Appointments />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
