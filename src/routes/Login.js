import axios from "axios";
import React from "react";

export default class Login extends React.Component {
  onSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username: this.username,
      password: this.password,
    };

    try {
      const accessToken = await axios.post("auth/signin", data);
      console.log(accessToken.data.accessToken);
      localStorage.setItem("token", accessToken.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            name="username"
            type="text"
            placeholder="username"
            required
            onChange={(e) => (this.username = e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            required
            onChange={(e) => (this.password = e.target.value)}
          />
          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}
