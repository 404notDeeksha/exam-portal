import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../../constants/routes";

export const RequireAuth = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  return token ? <Outlet /> : <Navigate to={routes.login} replace />;
};
