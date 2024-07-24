import { Suspense } from "react";
import { Loader } from "../Loader/Loader";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routesConstants";
import { useAuthStore } from "../../zustandStore/authStore";

export const Layout = () => {
  const location = useLocation();
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <>
      <header>
        Layout
        <button onClick={signOut}>LogOut</button>
      </header>
      {location.pathname === ROUTES.main && <Navigate to={ROUTES.dictionary} />}
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
