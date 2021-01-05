import { useKeycloak } from "@react-keycloak/web";
import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "./Login";
import MenuBar from "./MenuBar";
import People from "./People";
import ProtectedRoute from "./ProtectedRoute";
import jwt_decode from "jwt-decode";

function AppRouter() {
  const { keycloak } = useKeycloak();
  let token;
  try {
    token = jwt_decode(keycloak.token, null, 2);
  } catch {
    token = "";
  }
  const [tokenData, setTokenData] = useState(token);

  const handleTokenUpdate = () => {
    keycloak
      .updateToken()
      .then(() => {
        setTokenData(jwt_decode(keycloak.token, null, 2));
        console.log("token updated");
      })
      .catch(() => {
        console.log("Token update failed");
      });
  };

  return (
    <BrowserRouter>
      <MenuBar handleTokenUpdate={handleTokenUpdate} />
      <Switch>
        <Redirect exact from="/" to="/people" />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/people" component={People} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
