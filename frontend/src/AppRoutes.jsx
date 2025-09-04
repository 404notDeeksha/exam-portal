import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./constants/routes";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { NotFound } from "./components/NotFound";
import { RedirectIfAuth } from "./components/ProtectedRoutes/RedirectIfAuth";
import { HomePage } from "./pages/HomePage";
import { RequireAuth } from "./components/ProtectedRoutes/RequireAuth";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RedirectIfAuth />}>
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.login} element={<Login />} />
      </Route>

      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path={routes.home} element={<HomePage />} />
      </Route>

      <Route path="/home" element={<Navigate to={routes.home} replace />} />

      {/* not found page */}
      <Route path={routes.notFound} element={<NotFound />} />
    </Routes>
  );
};
