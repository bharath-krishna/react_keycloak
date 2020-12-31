import { useKeycloak } from "@react-keycloak/web";
import React from "react";

function Home() {
  const { keycloak } = useKeycloak();
  return (
    <div>
      {!keycloak.authenticated && <div>not</div>} authenticated
      {keycloak.authenticated && (
        <button onClick={() => keycloak.logout()}>Logout</button>
      )}
    </div>
  );
}

export default Home;
