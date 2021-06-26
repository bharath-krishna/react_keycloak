import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { Redirect, Route } from "react-router-dom";

function Login() {
  const { keycloak } = useKeycloak();
  if (keycloak.authenticated) {
    return <Redirect exact from="/login" to="/people" />;
  }

  return (
    <Route
      render={() => {
        window.location.href = keycloak.createLoginUrl();
        return null;
      }}
    />
  );
}

export default Login;
