import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, tokenData, ...rest }) {
  const { keycloak } = useKeycloak();
  return (
    <Route
      {...rest}
      render={(props) => {
        return keycloak.authenticated ? (
          <Component {...props} tokenData={tokenData} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        );
      }}
    />
  );
}

export default ProtectedRoute;
