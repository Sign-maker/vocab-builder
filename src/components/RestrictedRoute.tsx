import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../zustandStore/authStore";

interface RestrictedRouteProps {
  redirectTo?: string;
  component: React.FC;
}

export const RestrictedRoute: React.FC<RestrictedRouteProps> = ({
  redirectTo = "/",
  component: Component,
}) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};
