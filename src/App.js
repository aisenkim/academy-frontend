import React from "react";
import { BrowserRouter, HashRouter, Route } from "react-router-dom";
import StartTest from "./routes/StartTest";
import Home from "./routes/Home";
import Navigation from "./components/Navigation";
import Login from "./routes/Login";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home} />
      <Route path="/startTest" component={StartTest} />
      <Route path="/signin" component={Login} />
    </BrowserRouter>
  );
}

export default App;
