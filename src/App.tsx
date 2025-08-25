import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Notfound from "./pages/Notfound";
import Dashboard from "./pages/Dashboard/Dashboard";
import type { JSX } from "react";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuth = !!localStorage.getItem("token");
  return isAuth ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
