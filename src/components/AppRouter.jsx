import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {
  const { keycloak } = useKeycloak();
  // if (!keycloak.authenticated) {
  //   return <div>Loading....!!!</div>;
  // }
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
