import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, FormControl, ListGroup, Row} from "react-bootstrap";

function AllUsers() {
    // history
    const history = useHistory();

    // token
    const token = localStorage.getItem("token");

    // define state
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [searchCategory, setSearchCategory] = useState('')

    useEffect(() => {
        axios.get('auth/users', {headers: {Authorization: `Bearer ${token}`}})
            .then((result) => {
                setUsers(result.data);
            })

    }, []);


    return (
        <Container className="mt-4" fluid>
            <Row>
                <Col md={{span: 2, offset: 4}}>
                    <FormControl
                        as="select"
                        onChange={(event) => {
                            setSearchCategory(event.target.value)
                        }}
                    >
                        <option value="studentName">Name</option>
                        <option value="userName">Username</option>
                        <option value="userLevel">Level</option>
                    </FormControl>
                </Col>
                <Col md={{span: 4, offset: 0}}>
                    <FormControl
                        placecholder="Search..."
                        onChange={(event) => {
                            setSearchTerm(event.target.value)
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={{span: 6, offset: 4}}>
                    <ListGroup className="mt-2">
                        {users
                            .filter((user) => {
                                if (searchTerm == '') {
                                    return user
                                } else if (
                                    searchCategory === 'studentName' &&
                                    user.name.toLowerCase().includes(searchTerm.toLowerCase())
                                ) {
                                    return user
                                } else if (
                                    searchCategory === 'userName' &&
                                    user.username.toLowerCase().includes(searchTerm.toLowerCase())
                                ) {
                                    return user
                                } else if (
                                    searchCategory === 'userLevel' &&
                                    user.level.toLowerCase().includes(searchTerm.toLowerCase())
                                ) {
                                    return user
                                }
                            })
                            .map((user, idx) => {
                                return (
                                    <ListGroup.Item
                                        key={idx}
                                        as="button"
                                        variant="success"
                                        style={{color: 'black'}}
                                        onClick={(event) => {
                                            alert("[TODO] - Need to implement delete user and onclick. Try using /:user");
                                            // history.push({
                                            //     pathname: '/user-scores/person',
                                            //     state: {user: user},
                                            // })
                                        }}
                                    >
                                        {user.name} - {user.username} - {user.level}
                                    </ListGroup.Item>
                                )
                            })}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default AllUsers;