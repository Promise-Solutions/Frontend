import {
  BrowserRouter as Router, // Componente para gerenciar rotas
  Routes, // Contêiner para as rotas
  Route, // Define uma rota específica
  Navigate, // Redireciona para outra rota
} from "react-router-dom";

import Register from "./pages/Register/Register"; // Página de registro
import Users from "./pages/Users/Users"; // Página de usuários
import Login from "./pages/Login/Login"; // Página de login
import Bar from "./pages/Bar/Bar"; // Página do bar
import Dashboard from "./pages/Dashboard/Dashboard"; // Página do dashboard
import Reports from "./pages/Reports/Reports"; // Página de relatórios
import Projects from "./pages/Projects/Projects"; // Página de projetos
import Jobs from "./pages/Jobs/Jobs"; // Página de trabalhos
import Home from "./pages/Home/Home"; // Página inicial

function AppRoutes() {
  const isAuthenticated = !!sessionStorage.getItem("token"); // Verifica se o usuário está autenticado

  return (
    <Router>
      <Routes>
        {/* Rotas protegidas redirecionam para login se o usuário não estiver autenticado */}
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={isAuthenticated ? <Users /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Register /> : <Navigate to="/login" />}
        />
        <Route
          path="/bar"
          element={isAuthenticated ? <Bar /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/reports"
          element={isAuthenticated ? <Reports /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects"
          element={isAuthenticated ? <Projects /> : <Navigate to="/login" />}
        />
        <Route
          path="/jobs"
          element={isAuthenticated ? <Jobs /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
