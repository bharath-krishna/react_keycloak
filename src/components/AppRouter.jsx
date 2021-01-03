import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import userContext from "./UserContext";

function AppRouter() {
  return (
    <userContext.Provider>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default AppRouter;
