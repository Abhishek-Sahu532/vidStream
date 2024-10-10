import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { success } = useSelector((state) => state.user);
  if (!success) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

export { ProtectedRoutes };
