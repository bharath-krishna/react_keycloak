import logo from "./logo.svg";
import "./App.css";
import AppRouter from "./components/AppRouter";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./components/Keycloak";

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
