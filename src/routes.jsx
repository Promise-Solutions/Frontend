import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./pages/Register/Register";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";
import Bar from "./pages/Bar/Bar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Reports from "./pages/Reports/Reports";
import Projects from "./pages/Projects/Projects";
import Jobs from "./pages/Jobs/Jobs";
import Home from "./pages/Home/Home";

function AppRoutes() {
  const isAuthenticated = !!sessionStorage.getItem("token");

  return (
    <Router>
      <Routes>
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
