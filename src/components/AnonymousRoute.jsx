import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const AnonymousRoute = () => {
  const { user } = useAuthContext();
  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default AnonymousRoute;
