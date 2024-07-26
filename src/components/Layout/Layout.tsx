import { Suspense, useEffect } from "react";
import { Loader } from "../Loader/Loader";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routesConstants";
import { useAuthStore } from "../../zustandStore/authStore";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const signOut = useAuthStore((state) => state.signOut);

  useEffect(() => {
    if (location.pathname === ROUTES.main) {
      navigate(ROUTES.dictionary);
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <header>
        Layout
        <button onClick={signOut}>LogOut</button>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
