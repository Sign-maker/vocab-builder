import { Suspense } from "react";
import { Loader } from "../Loader/Loader";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routesConstants";

export const Layout = () => {
  const location = useLocation();

  return (
    <>
      <header>Layout</header>
      {location.pathname === ROUTES.main && <Navigate to={ROUTES.dictionary} />}
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
