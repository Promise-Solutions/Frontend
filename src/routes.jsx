import {
  Routes, // Contêiner para as rotas
  Route, // Define uma rota específica
  Navigate, // Redireciona para uma nova página
} from "react-router-dom";

// Importação das páginas
import Register from "./pages/Register/Register";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";
import Bar from "./pages/Bar/Bar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Reports from "./pages/Reports/Reports";
import Projects from "./pages/Projects/Projects";
import Jobs from "./pages/Jobs/Jobs";
import Home from "./pages/Home/Home";
import User from "./pages/Users/User/User.jsx";
import JobManagement from "./pages/Jobs/JobManagement/JobManagement.jsx";
import Stock from "./pages/Stock/Stock";
import Command from "./pages/Command/Command";
import Tasks from "./pages/Tasks/Tasks";
import JobRegister from "./pages/Register/JobRegister/JobRegister.jsx";
import SubJobRegister from "./pages/Register/SubJobRegister/SubJobRegister.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<Users />} />
      <Route path="/user/:userParam" element={<User />} />
      <Route path="/jobs/:jobId" element={<JobManagement />} />
      <Route path="/register/jobs" element={<JobRegister />} />
      <Route path="/user/:userParam/register/jobs" element={<JobRegister />} />
      <Route path="/register/subjobs" element={<SubJobRegister />} />
      <Route path="/register" element={<Register />} />
      <Route path="/bar" element={<Bar />} />
      <Route path="/bar/stock" element={<Stock />} />
      <Route path="/command/:command" element={<Command />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
}

export default AppRoutes;
