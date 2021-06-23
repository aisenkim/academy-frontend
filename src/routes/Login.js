import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Login(props) {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   props.setAppToken("");
  // }, []);

  const usernameChange = (event) => {
    setUsername(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      const accessToken = await axios.post("auth/signin", data);
      localStorage.setItem("token", accessToken.data.accessToken);
      localStorage.setItem("name", accessToken.data.name);
      localStorage.setItem("roles", accessToken.data.roles);
      localStorage.setItem("level", accessToken.data.level);
      // to change navbar from login -> username (handled in App.js)
      props.setAppUser(accessToken.data.name);
      history.push("/");
    } catch (error) {
      // failed login
      setErrorMessage("Login failed. Please check your id or password");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          type="text"
          placeholder="username"
          value={username}
          required
          onChange={usernameChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          required
          onChange={passwordChange}
        />
        <input type="submit" value="Log In" />
      </form>
      <div style={{ fontSize: 20, color: "red" }}>{errorMessage}</div>
    </div>
  );
}

export default Login;
