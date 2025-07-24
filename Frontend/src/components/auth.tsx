import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function PrivateRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${VITE_API_URL}/verify-session/`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return <p>Verificando autenticación...</p>; 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
