import React, { useEffect, useState } from "react";
import axios from "axios";

function Home(props) {
  // const [from, setFrom] = useState("");
  // const [to, setTo] = useState("");

  const userLevel = localStorage.getItem("level");
  const token = localStorage.getItem("token");

  // GET today's date
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const testDate = yyyy + "-" + mm + "-" + dd;

  useEffect(() => {
    async function getPlan() {
      try {
        const plan = await axios.get(
          `testing/getPlan?level=${userLevel}&testDate=${testDate}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // extract "from" and "to" from plan
        const planData = plan.data[0];
        const { from, to } = planData;
        // setFrom(from);
        // setTo(to);
        // make request to get test data
      } catch (error) {
        console.log(error);
      }
    }
    getPlan();
  }, []);

  // axios
  //   .get(`testing/getPlan?level=${userLevel}&testDate=${testDate}`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //   .then((plan) => {
  //     const planData = plan.data;
  //     const from = planData[0].from;
  //     const to = planData[0].to;

  //   });

  return (
    <div>
      <h1>Welcome to the Home Page {props.appUser}!</h1>
      <h3>오늘 할일</h3>
      {props.appUser && userLevel === "sp3" ? <h1>Test exist</h1> : null}
    </div>
  );
}

export default Home;
