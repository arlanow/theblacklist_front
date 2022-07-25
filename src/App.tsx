import React from 'react';
import './App.css';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import '../node_modules/primeflex/primeflex.css'
import RouterService from "./services/RouterService";
import {Route, Routes} from "react-router-dom";
import NavHeader from "./components/NavHeader";

function App() {
    const routes: Array<{path: string, element: any}> = RouterService();
    return (
        <div className="App">
            <NavHeader/>
            <Routes>
                {
                    routes.map((val) => {
                        return <Route path={val.path} element={val.element} key={val.path}/>
                    })
                }
            </Routes>

        </div>
    );
}

export default App;
