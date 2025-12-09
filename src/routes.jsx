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
import ResetPassword from "./pages/ResetPassword/ResetPassword.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import { ProtectedRoute } from "./components/protected-route/ProtectedRoute.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTERS.HOME} element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.HOME_ALIAS} element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.LOGIN} element={<Login />} />

      <Route path={ROUTERS.USERS} element={
        <ProtectedRoute>
          <Users />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.USER_DETAIL} element={
        <ProtectedRoute>
          <User />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.JOB_DETAIL} element={
        <ProtectedRoute>
          <JobManagement />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.JOB_REGISTER} element={
        <ProtectedRoute>
          <JobRegister />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.USER_JOB_REGISTER} element={
        <ProtectedRoute>
          <JobRegister />
        </ProtectedRoute>
        } />


      <Route path={ROUTERS.SUBJOB_REGISTER} element={
        <ProtectedRoute>
          <SubJobRegister />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.REGISTER} element={
        <ProtectedRoute>
          <Register />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.BAR} element={
        <ProtectedRoute>
          <Bar />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.BAR_STOCK} element={
        <ProtectedRoute>
          <Stock />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.COMMAND} element={
        <ProtectedRoute>
          <Command />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.DASHBOARD} element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.REPORTS} element={
        <ProtectedRoute>
          <Reports />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.JOBS} element={
        <ProtectedRoute>
          <Jobs />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.TASKS} element={
        <ProtectedRoute>
          <Tasks />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.EXPENSES} element={
        <ProtectedRoute>
          <Expenses />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.CALENDAR} element={
        <ProtectedRoute>
          <Calendar />
        </ProtectedRoute>
        } />

      <Route path={ROUTERS.RESET} element={<ResetPassword />} />

      <Route path={ROUTERS.FORGOT} element={<ForgotPassword />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
