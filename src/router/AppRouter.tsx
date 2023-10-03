import React from "react";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { authRoutes } from "./AuthRouter";
import { homeRoutes } from "./HomeRouter";
import AuthPage from "../pages/AuthPage";
import RouteGuard from "../components/Auth/RouteGuard";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RouteGuard />,
    children: [...authRoutes, ...homeRoutes],
  },
];
const router = createBrowserRouter(routes);
const RoutesProvider = () => {
  return <RouterProvider router={router} fallbackElement={<AuthPage />} />;
};

export default RoutesProvider;
