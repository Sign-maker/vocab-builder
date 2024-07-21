import React from "react";
import { Navigate } from "react-router-dom";

interface RestrictedRouteProps {
  redirectTo?: string;
  component: React.FC;
}

export const RestrictedRoute: React.FC<RestrictedRouteProps> = ({
  redirectTo = "/",
  component: Component,
}) => {
  const isLoggedIn = true;

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};
