import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../zustandStore/authStore";
// import { useAuth } from "../../hooks/useAuth";

interface PrivateRouteProps {
  redirectTo?: string;
  component: React.FC;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectTo = "/",
  component: Component,
}) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isRefreshing = useAuthStore((state) => state.isRefreshing);

  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};
