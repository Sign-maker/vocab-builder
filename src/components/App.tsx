import { lazy, Suspense, useEffect, useRef } from "react";
import { ROUTES } from "../constants/routesConstants";
import { Layout } from "./Layout/Layout";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { Loader } from "./Loader/Loader";
import { useAuthStore } from "../zustandStore/authStore";

const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const DictionaryPage = lazy(
  () => import("../pages/DictionaryPage/DictionaryPage")
);
const RecommendPage = lazy(() => import("../pages/RecomendPage/RecomendPage"));
const TrainingPage = lazy(() => import("../pages/TrainingPage/TrainingPage"));

const routes = [
  {
    path: ROUTES.register,
    element: (
      <Suspense fallback={<Loader />}>
        <RestrictedRoute component={RegisterPage} />
      </Suspense>
    ),
  },
  {
    path: ROUTES.login,
    element: (
      <Suspense fallback={<Loader />}>
        <RestrictedRoute component={LoginPage} />
      </Suspense>
    ),
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
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      getCurrentUser();
      firstRender.current = false;
    }
  }, [getCurrentUser]);

  return <RouterProvider router={router} />;
};

export default App;
