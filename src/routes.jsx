import {
  BrowserRouter as Router, // Componente para gerenciar rotas
  Routes, // Contêiner para as rotas
  Route, // Define uma rota específica
  Navigate,
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
import User from "./pages/User/User"; // Página de usuário
import Stock from "./pages/Stock/Stock";
import Command from "./pages/Command/Command"; // Página de comanda

function ProtectedRoute({ element }) {
  const isAuthenticated = !!localStorage.getItem("token"); // Verifica se o usuário está autenticado
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<ProtectedRoute element={<Users />} />} />
        <Route
          path="/user/:user"
          element={<ProtectedRoute element={<User />} />}
        />
        <Route
          path="/register"
          element={<ProtectedRoute element={<Register />} />}
        />
        <Route path="/bar" element={<ProtectedRoute element={<Bar />} />} />
        <Route
          path="/bar/stock"
          element={<ProtectedRoute element={<Stock />} />}
        />
        <Route
          path="/bar/command/:idCommand"
          element={<ProtectedRoute element={<Command />} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/reports"
          element={<ProtectedRoute element={<Reports />} />}
        />
        <Route
          path="/projects"
          element={<ProtectedRoute element={<Projects />} />}
        />
        <Route path="/jobs" element={<ProtectedRoute element={<Jobs />} />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
