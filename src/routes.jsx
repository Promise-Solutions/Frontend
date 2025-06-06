import {
  Routes, // Contêiner para as rotas
  Route, // Define uma rota específica
  Navigate, // Redireciona para uma nova página
} from "react-router-dom";

import { ROUTERS } from "./constants/routers.js";
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
import Expenses from "./pages/Expenses/Expenses.jsx";
import Calendar from "./pages/Calendar/Calendar.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTERS.HOME} element={<Home />} />
      <Route path={ROUTERS.HOME_ALIAS} element={<Home />} />
      <Route path={ROUTERS.LOGIN} element={<Login />} />
      <Route path={ROUTERS.USERS} element={<Users />} />
      <Route path={ROUTERS.USER_DETAIL} element={<User />} />
      <Route path={ROUTERS.JOB_DETAIL} element={<JobManagement />} />
      <Route path={ROUTERS.JOB_REGISTER} element={<JobRegister />} />
      <Route path={ROUTERS.USER_JOB_REGISTER} element={<JobRegister />} />
      <Route path={ROUTERS.SUBJOB_REGISTER} element={<SubJobRegister />} />
      <Route path={ROUTERS.REGISTER} element={<Register />} />
      <Route path={ROUTERS.BAR} element={<Bar />} />
      <Route path={ROUTERS.BAR_STOCK} element={<Stock />} />
      <Route path={ROUTERS.COMMAND} element={<Command />} />
      <Route path={ROUTERS.DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTERS.REPORTS} element={<Reports />} />
      <Route path={ROUTERS.PROJECTS} element={<Projects />} />
      <Route path={ROUTERS.JOBS} element={<Jobs />} />
      <Route path={ROUTERS.TASKS} element={<Tasks />} />
      <Route path={ROUTERS.EXPENSES} element={<Expenses />} />
      <Route path={ROUTERS.CALENDAR} element={<Calendar />} />
    </Routes>
  );
}

export default AppRoutes;
