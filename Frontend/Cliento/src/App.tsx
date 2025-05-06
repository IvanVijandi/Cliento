import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página de inicio */}
        <Route path="/" element={<Home />} />

        {/* Ruta para la página de login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta para la página de registro */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
