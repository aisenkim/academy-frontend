import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StartTest from "./routes/StartTest";
import Home from "./routes/Home";
import Navigation from "./components/Navigation";
import Login from "./routes/Login";
import Plan from "./routes/Plan";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("name"));

  return (
    <BrowserRouter>
      <Navigation
        appToken={token}
        setAppToken={setToken}
        appUser={user}
        setAppUser={setUser}
      />
      <Switch>
        <Route exact path="/startTest" component={StartTest} />
        <Route exact path="/signin">
          <Login setAppUser={setUser} />
        </Route>
        <Route exact path="/createPlan" component={Plan} />
        <Route path="/" exact={true}>
          <Home appUser={user} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
