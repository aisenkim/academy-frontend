import React, {useState} from 'react'
import {Switch, Route, HashRouter} from 'react-router-dom'
import Test from './routes/Test'
import Login from './routes/Login'
import Plan from './routes/Plan'
import UserScore from './routes/UserScore'
import ProtectedRoute from './functions/ProtectedRoute'
import UserScorePerson from './routes/UserScorePerson'
import UserTestQuestion from './routes/UserTestQuestion'
import CreateTest from './routes/CreateTest'
import Retest from "./routes/Retest";
import CreateUser from "./routes/CreateUser";
import AllUsers from "./routes/AllUsers";
import WordList from "./routes/WordList";
import WordTest from "./routes/WordTest";
import GlobalStyle from "./globalStyles";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/HomePage/Home";
import Contact from "./components/Contact/Contact";

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(localStorage.getItem('name'))

    return (
        <HashRouter>
            <GlobalStyle />
            <Navbar
                appToken={token}
                setAppToken={setToken}
                appUser={user}
                setAppUser={setUser}
            />
            {/*<Navigation*/}
            {/*    appToken={token}*/}
            {/*    setAppToken={setToken}*/}
            {/*    appUser={user}*/}
            {/*    setAppUser={setUser}*/}
            {/*/>*/}
            <Switch>
                {/*<Route exact path="/startTest" component={__StartTest}/>*/}
                <Route exact path="/startTest" component={WordTest}/>
                <Route exact path="/contact" component={Contact}/>
                <Route exact path="/signin">
                    <Login setAppUser={setUser}/>
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
                    path="/tests"
                    component={Test}
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
                    path="/create-users"
                    component={CreateUser}
                    setAppToken={setToken}
                    setAppUser={setUser}
                />
                <ProtectedRoute
                    exact
                    path="/users"
                    component={AllUsers}
                    setAppToken={setToken}
                    setAppUser={setUser}
                />
                <ProtectedRoute
                    exact
                    path="/createTest"
                    component={CreateTest}
                    setAppToken={setToken}
                    setAppUser={setUser}
                    appUser={user}
                />
                <Route
                    exact
                    path="/word-list"
                    component={WordList}
                    setAppToken={setToken}
                    setAppUser={setUser}
                    appUser={user}
                />
                {/* <Route exact path="/createPlan" component={Plan} /> */}
                {/*<Route path="/" exact={true}>*/}
                {/*    <Test appUser={user} setAppToken={setToken} setAppUser={setUser}/>*/}
                {/*</Route>*/}
                <Route
                    exact
                    path="/"
                    component={Home}
                    setAppToken={setToken}
                    setAppUser={setUser}
                    appUser={user}
                />
            </Switch>
        </HashRouter>
    )
}

export default App
