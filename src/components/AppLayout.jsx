import { Container, Grid, Menu } from "@material-ui/core";
import { useKeycloak } from "@react-keycloak/web";
import React, { useState } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import People from "./People";
import ProtectedRoute from "./ProtectedRoute";
import jwt_decode from "jwt-decode";
import MenuBar from "./MenuBar";

function AppLayout() {
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
    <Container>
      <Grid container direction="column">
        <Grid item>
          <MenuBar handleTokenUpdate={handleTokenUpdate} />
        </Grid>
        <Grid>MainBody</Grid>
      </Grid>
    </Container>
  );
}

export default AppLayout;
