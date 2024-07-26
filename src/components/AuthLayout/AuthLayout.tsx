import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { ROUTES } from "../../constants/routesConstants";

export const AuthLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === ROUTES.auth) {
      navigate(ROUTES.login);
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <header>Logo</header>
      <main>
        AuthLayout
        <section>
          {/* <Hero /> */}
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </section>
      </main>
    </>
  );
};
