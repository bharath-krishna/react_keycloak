import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@material-ui/core";
import { useKeycloak } from "@react-keycloak/web";
import React, { useState } from "react";
import Menu from "./Menu";
import jwt_decode from "jwt-decode";

function Home({ user }) {
  const { keycloak } = useKeycloak();
  const [tokenData, setTokenData] = useState(
    jwt_decode(keycloak.token, null, 2)
  );

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
      <Menu handleTokenUpdate={handleTokenUpdate} />
      {!keycloak.authenticated && <div>not</div>} authenticated
      {keycloak.authenticated && (
        <div>
          <button onClick={() => keycloak.logout()}>Logout</button>
          <button onClick={handleTokenUpdate}>Refresh token</button>
        </div>
      )}
      <Typography variant="h4">Token Details</Typography>
      <Accordion>
        <AccordionSummary>
          <Typography variant="h5">Decoded</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" align="left">
            {JSON.stringify(tokenData)}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography variant="h5">Token</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" align="left">
            {keycloak.token}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default Home;
