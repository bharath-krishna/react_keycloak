import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { Redirect } from "react-router-dom";

function Login() {
  const { keycloak } = useKeycloak();
  if (keycloak.authenticated) {
    return <Redirect exact from="/login" to="/home" />;
  }
  return (
    <div>
      {!keycloak.authenticated && <div>not</div>} authenticated
      <button onClick={() => keycloak.login()}>Login</button>
    </div>
  );
}

export default Login;
