import axios from "axios";
import React from "react";

export default class Plan extends React.Component {
  onSubmit = async (event) => {
    event.preventDefault();

    const data = {
      level: this.level,
      testDate: this.date,
      from: this.from,
      to: this.to,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("admin/createPlan", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            name="level"
            type="text"
            placeholder="level"
            required
            onChange={(e) => (this.level = e.target.value)}
          />
          <input
            name="testDate"
            type="date"
            required
            onChange={(e) => (this.date = e.target.value)}
          />
          <input
            name="from"
            type="text"
            placeholder="from"
            required
            onChange={(e) => (this.from = e.target.value)}
          />
          <input
            name="to"
            type="text"
            placeholder="to"
            required
            onChange={(e) => (this.to = e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
