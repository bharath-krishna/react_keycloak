import { AppBar, Avatar, Button, Link, Toolbar } from "@material-ui/core";
import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { Redirect } from "react-router-dom";

function MenuBar({ handleTokenUpdate }) {
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
          <Button
            onClick={() => {
              window.location.href = "/home";
              return null;
            }}
          >
            <Avatar />
          </Button>
          {keycloak.authenticated ? (
            <div>
              <Button onClick={handleLogout}>Logout</Button>
              <Button onClick={handleTokenUpdate}>Refresh</Button>
              <Button
                onClick={() => {
                  window.location.href = "/people";
                  return null;
                }}
              >
                People
              </Button>
            </div>
          ) : (
            <div>
              <Button onClick={handleLogin}>Login</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default MenuBar;
