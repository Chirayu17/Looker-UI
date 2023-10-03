import { LoaderFunction, RouteObject, redirect } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import React from "react";
import ErrorPage from "../pages/ErrorPage";
import { ROUTE_PATHS } from "./RoutePaths";
import { isAuthenticated } from "../utils/Auth";

const isNewUser = (path: string) =>
  path === ROUTE_PATHS.INDEX + ROUTE_PATHS.SIGNUP ? true : false;

const loaderFn: LoaderFunction = ({ request }) => {
  const path = new URL(request.url).pathname;
  const newUser = isNewUser(path);
  if (isAuthenticated()) {
    return redirect(ROUTE_PATHS.INDEX);
  }
  return newUser;
};

export const authRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.LOGIN,
    element: <AuthPage />,
    loader: loaderFn,
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTE_PATHS.SIGNUP,
    element: <AuthPage />,
    loader: loaderFn,
    errorElement: <ErrorPage />,
  },
];
