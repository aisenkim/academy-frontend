import React from "react";
import { HashRouter, Route } from "react-router-dom";
import StartTest from "./routes/StartTest";
import Home from "./routes/Home";
import Navigation from "./components/Navigation";
import Login from "./routes/Login";

function App() {
  return (
    <HashRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home} />
      <Route path="/startTest" component={StartTest} />
      <Route path="/signin" component={Login} />
    </HashRouter>
  );
}

export default App;
