import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import StartTest from './routes/StartTest'
import Home from './routes/Home'
import Navigation from './components/Navigation'
import Login from './routes/Login'
import Plan from './routes/Plan'
import UserScore from './routes/UserScore'
import ProtectedRoute from './functions/ProtectedRoute'
import UserScorePerson from './routes/UserScorePerson'
import UserTestQuestion from './routes/UserTestQuestion'
import CreateTest from './routes/CreateTest'
import Retest from "./routes/Retest";
import CreateUser from "./routes/CreateUser";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(localStorage.getItem('name'))

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
        <ProtectedRoute
          exact
          path="/createPlan"
          component={Plan}
          setAppToken={setToken}
          setAppUser={setUser}
          appUser={user}
        />
        <ProtectedRoute
          exact
          path="/user-scores/person"
          component={UserScorePerson}
          setAppToken={setToken}
          setAppUser={setUser}
        />
        <ProtectedRoute
            path="/retests"
            component={Retest}
            setAppToken={setToken}
            setAppUser={setUser}
        />
        <ProtectedRoute
          exact
          path="/user-scores/person/questions"
          component={UserTestQuestion}
          setAppToken={setToken}
          setAppUser={setUser}
        />
        <ProtectedRoute
          exact
          path="/user-scores"
          component={UserScore}
          setAppToken={setToken}
          setAppUser={setUser}
          appUser={user}
        />
        <ProtectedRoute
          exact
          path="/users"
          component={CreateUser}
          setAppToken={setToken}
          setAppUser={setUser}
        />
        <Route
          exact
          path="/createTest"
          component={CreateTest}
          setAppToken={setToken}
          setAppUser={setUser}
          appUser={user}
        />
        {/* <Route exact path="/createPlan" component={Plan} /> */}
        <Route path="/" exact={true}>
          <Home appUser={user} setAppToken={setToken} setAppUser={setUser} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
