import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes({ element }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
   isAuthenticated ? <Outlet /> : <Navigate to="/signin" /> 
  
  );
}
