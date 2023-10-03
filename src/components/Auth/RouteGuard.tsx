import React from "react";
import { Outlet } from "react-router";

const RouteGuard: React.FC<{}> = () => {
  let element = <Outlet />;
  // TODO: Add logic to authorize routes here
  return element;
};

export default RouteGuard;
