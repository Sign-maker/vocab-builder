import React from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

interface PrivateRouteProps {
  redirectTo?: string;
  component: React.FC;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectTo = "/",
  component: Component,
}) => {
  //   const { isLoggedIn, isRefreshing } = useAuth();
  const isLoggedIn = true;
  const isRefreshing = false;

  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};
