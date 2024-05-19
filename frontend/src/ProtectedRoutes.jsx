import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
