/**
 * Page to get user score by admin
 */

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Form,
  FormControl,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import axios from "axios";

function UserScore() {
  const history = useHistory();

  // define states
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  // get data from backend
  useEffect(() => {
    // make post request to /getUserScore
    const token = localStorage.getItem("token");
    axios
      .get("auth/allUsers", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setUsers(result.data);
        // let localUsernames = [];
        // let localNames = [];
        // for (let [i, user] of result.data.entries()) {
        //   localUsernames[i] = user.username;
        //   localNames[i] = user.name;
        // }
        // setUsers(localNames);
        // setUsername(localUsernames);
      });
  }, []);

  const handleChange = (event) => {};

  const search = async (event) => {
    event.preventDefault();
  };

  // First show a search bar and the whole user list below
  // admin can click on the user name to see the user's exam scores
  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col md={{ span: 2, offset: 4 }}>
          <FormControl
            as="select"
            onChange={(event) => {
              setSearchCategory(event.target.value);
            }}
          >
            <option value="studentName">Name</option>
            <option value="userName">Username</option>
            <option value="userLevel">Level</option>
          </FormControl>
        </Col>
        <Col md={{ span: 4, offset: 0 }}>
          <FormControl
            placecholder="Search..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 4 }}>
          <ListGroup className="mt-2">
            {users
              .filter((user) => {
                if (searchTerm == "") {
                  return user;
                } else if (
                  searchCategory === "studentName" &&
                  user.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return user;
                } else if (
                  searchCategory === "userName" &&
                  user.username.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return user;
                } else if(
                  searchCategory === "userLevel" &&
                  user.level.toLowerCase().includes(searchTerm.toLowerCase()) ) {
                    return user;
                }
              })
              .map((user, idx) => {
                return (
                  <ListGroup.Item
                    key={idx}
                    as="button"
                    variant="success"
                    style={{ color: "black" }}
                    onClick={(event) => {
                      history.push({
                        pathname: "/getUserScore/person",
                        state: { user: user },
                      });
                    }}
                  >
                    {user.name} - {user.username} - {user.level}
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
        </Col>
      </Row>

      {/* {username.map((user, index) => {
        return <div key={index}>{user}</div>;
      })} */}
    </Container>
  );
}

export default UserScore;
