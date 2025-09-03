import { Route, Routes } from "react-router-dom";
import { routes } from "./constants/routes";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={routes.register} element={<Register />} />
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.notFound} element={<NotFound />} />
    </Routes>
  );
};
