import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useKeycloak } from "@react-keycloak/web";
import React from "react";

function Home({ tokenData }) {
  const { keycloak } = useKeycloak();
  return (
    <Container>
      <Toolbar />
      {!keycloak.authenticated && <div>not</div>} authenticated
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
