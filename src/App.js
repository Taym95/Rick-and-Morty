import React, { lazy } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { withSuspense } from "./HOC";

const CharacterList = lazy(() =>
  import("./containers").then(({ CharacterList }) => ({
    default: CharacterList
  }))
);

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={withSuspense(CharacterList)} />
      </Switch>
    </BrowserRouter>
  );
};

const AppContainer = () => (
  <Container>
    <Routes />
  </Container>
);

function App() {
  return <AppContainer />;
}

export default App;
