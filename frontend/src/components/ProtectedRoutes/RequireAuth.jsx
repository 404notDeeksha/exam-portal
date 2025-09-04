import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../../constants/routes";

export const RequireAuth = () => {
  const token = useSelector((state) => state.auth.token);

  return token ? <Outlet /> : <Navigate to={routes.login} replace />;
};
