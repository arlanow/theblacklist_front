import React from 'react';
import UnitsPage from "../pages/UnitsPage";
import UnitPage from "../pages/UnitPage";

const RouterService = () => {
    let routes = []
    routes.push({path: '/', element: <UnitsPage />})
    routes.push({path: '/units', element: <UnitsPage />})
    routes.push({path: '/units/companies', element: <UnitsPage filter='company' />})
    routes.push({path: '/units/bloggers', element: <UnitsPage filter='blogger' />})
    routes.push({path: '/unit/:id', element: <UnitPage />})
    return routes;
};

export default RouterService;