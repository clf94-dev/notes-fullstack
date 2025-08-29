import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  const isAuthenticated = token && jwtDecode(token).exp * 1000 > Date.now();
  if (!isAuthenticated || !token) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return children ?? <Outlet />;
}

export default RequireAuth;
