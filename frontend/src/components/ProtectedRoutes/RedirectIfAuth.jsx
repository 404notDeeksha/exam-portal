import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../../constants/routes";

export const RedirectIfAuth = () => {
  const token = useSelector((state) => state.auth.token);

  return token ? <Navigate to={routes.home} replace /> : <Outlet />;
};
