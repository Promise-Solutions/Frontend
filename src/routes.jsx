import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./pages/Register/Register";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";

function AppRoutes() {
  const isAuthenticated = !!sessionStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={isAuthenticated ? <Users /> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={isAuthenticated ? <Users /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Register /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
