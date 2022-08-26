import React from "react";
import UnitPage from "../pages/UnitPage";
import UnitsTablePage from "../pages/UnitsTablePage";

const RouterService = () => {
  let routes = []
  routes.push({path: "/", element: <UnitsTablePage />})
  routes.push({path: "/units", element: <UnitsTablePage />})
  routes.push({path: "/unit/:id", element: <UnitPage />})
  return routes;
};

export default RouterService;