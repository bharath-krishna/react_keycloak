import "./App.css";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./components/Keycloak";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ReactKeycloakProvider
          authClient={keycloak}
          LoadingComponent={<div>Loading....!!!</div>}
        >
          <AppRouter />
        </ReactKeycloakProvider>
      </header>
    </div>
  );
}

export default App;
