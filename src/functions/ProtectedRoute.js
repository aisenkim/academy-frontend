import React, {useEffect} from "react";
import {Route, Redirect, useHistory} from "react-router-dom";
import isAuthenticated from "./authService";

export const ProtectedRoute = ({
                                   path,
                                   component: Component,
                                   render,
                                   setAppToken,
                                   setAppUser,
                                   ...rest
                               }) => {
    //   const history = useHistory();
    //  const [token, setToken] = useState("");
    //  const [user, setUser] = useState("");

    /*
      useEffect(() => {
        // setAppToken("");
        // setAppUser(appUser);
      }, []);

     */

    return (
        <Route
            path={path}
            {...rest}
            render={(props) => {
                if (isAuthenticated()) {
                    return Component ? <Component {...props} /> : render(props);
                } else {
                    // this results in error because setting state in the rendering process
                    //   return history.push("/signin");
                    // before clearing local storage, set values to null
                    setAppUser(null);
                    setAppToken(null);
                    localStorage.clear();
                    return <Redirect to="/signin"/>;
                }
            }}
        />
    );
};

export default ProtectedRoute;
