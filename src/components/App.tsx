import { lazy, useEffect, useRef } from "react";
import { ROUTES } from "../constants/routesConstants";
import { Layout } from "./Layout/Layout";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { useAuthStore } from "../zustandStore/authStore";
import { AuthLayout } from "./AuthLayout/AuthLayout";
import { Loader } from "./Loader/Loader";

const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const DictionaryPage = lazy(
  () => import("../pages/DictionaryPage/DictionaryPage")
);
const RecommendPage = lazy(() => import("../pages/RecomendPage/RecomendPage"));
const TrainingPage = lazy(() => import("../pages/TrainingPage/TrainingPage"));

const routes = [
  {
    path: ROUTES.auth,
    element: <RestrictedRoute component={AuthLayout} />,
    children: [
      {
        path: ROUTES.login,
        element: <RestrictedRoute component={LoginPage} />,
      },
      {
        path: ROUTES.register,
        element: <RestrictedRoute component={RegisterPage} />,
      },
    ],
  },

  {
    path: ROUTES.main,
    element: <PrivateRoute redirectTo={ROUTES.login} component={Layout} />,
    children: [
      {
        path: ROUTES.dictionary,
        element: (
          <PrivateRoute redirectTo={ROUTES.login} component={DictionaryPage} />
        ),
      },
      {
        path: ROUTES.recommend,
        element: (
          <PrivateRoute redirectTo={ROUTES.login} component={RecommendPage} />
        ),
      },
      {
        path: ROUTES.training,
        element: (
          <PrivateRoute redirectTo={ROUTES.login} component={TrainingPage} />
        ),
      },
    ],
  },
  { path: "*", element: <Navigate to="/" /> },
];

const routerOptions = {
  basename: "/",
};

const router = createBrowserRouter(routes, routerOptions);

const App = () => {
  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);
  const isRefreshing = useAuthStore((state) => state.isRefreshing);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      getCurrentUser();
      firstRender.current = false;
    }
  }, [getCurrentUser]);

  return <>{isRefreshing ? <Loader /> : <RouterProvider router={router} />}</>;
};

export default App;
