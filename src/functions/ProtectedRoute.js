import React, { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import isAuthenticated from "./authService";

export const ProtectedRoute = ({
  path,
  component: Component,
  render,
  setAppToken,
  setAppUser,
  appUser,
  ...rest
}) => {
  //   const history = useHistory();
  //  const [token, setToken] = useState("");
  //  const [user, setUser] = useState("");

  useEffect(() => {
    // setAppToken("");
    // setAppUser(appUser);
  }, []);

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
          localStorage.clear();
            setAppToken("");
            setAppUser("");
          return <Redirect to="/signin" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
