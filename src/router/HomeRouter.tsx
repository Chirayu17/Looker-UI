import React from "react";
import { LoaderFunction, RouteObject, redirect } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import { isAuthenticated } from "../utils/Auth";
import { ROUTE_PATHS } from "./RoutePaths";

const loaderFn: LoaderFunction = ({ request }) => {
  if (!isAuthenticated()) {
    return redirect(ROUTE_PATHS.LOGIN);
  }
  return null;
};

export const homeRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
    errorElement: <ErrorPage />,
    loader: loaderFn,
  },
];
