import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
   isAuthenticated ? <Outlet /> : <Navigate to="/signin" /> 
  
  );
}
