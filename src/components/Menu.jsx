import { AppBar, Button, Link, Toolbar } from "@material-ui/core";
import { useKeycloak } from "@react-keycloak/web";
import React from "react";

function Menu({ handleTokenUpdate }) {
  const { keycloak } = useKeycloak();
  const handleLogin = () => {
    keycloak.login();
  };
  const handleLogout = () => {
    keycloak.logout();
  };
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleLogout}>Logout</Button>
          <Button onClick={handleTokenUpdate}>Refresh</Button>
          <Link href="/people" style={{ color: "black" }}>
            People
          </Link>
          <Button
            onClick={() => {
              window.location.href = "/people";
            }}
          >
            People
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Menu;
