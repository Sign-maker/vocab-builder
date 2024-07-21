import { lazy } from "react";
import { ROUTES } from "../constants/routesConstants";
import { Layout } from "./Layout/Layout";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";

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
    element: <RestrictedRoute component={RegisterPage} />,
  },
  { path: ROUTES.login, element: <RestrictedRoute component={LoginPage} /> },
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

const App = () => <RouterProvider router={router} />;

export default App;
