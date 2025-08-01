import { useEffect, useState } from "react";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${VITE_API_URL}/verify-session/`, {
      credentials: "include",
    })
      .then((res) => {
        setIsAuthenticated(res.ok);
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  return isAuthenticated;
};

export default useAuth;