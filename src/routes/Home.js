import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Container, Row, Col} from 'react-bootstrap'
import {Table} from 'react-bootstrap'
import {useHistory} from "react-router-dom";

function Home(props) {
    const history = useHistory();
    const [retests, setRetests] = useState([]);

    const userLevel = localStorage.getItem('level')
    const token = localStorage.getItem('token')

    // GET today's date
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    const testDate = yyyy + '-' + mm + '-' + dd

    useEffect(() => {
        async function getRetest() {
            try {
                if (token) {
                    const retest = await axios.get('retests', {
                        headers: {Authorization: `Bearer ${token}`},
                    })
                    setRetests(retest.data);
                }
            } catch (err) {
                setRetests([]);
            }
        }

        getRetest()
    }, []);


    return (
        <Container className="mt-4" fluid>
            <Row>
                <Col md={{span: 4, offset: 4}}>
                    <h1>Welcome {props.appUser}!</h1>
                </Col>
            </Row>
            <Row>
                <Col md={{span: 2, offset: 0}}>
                    <h3>My Retests</h3>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Test Date</th>
                    <th>Test Range</th>
                    <th>Test Type</th>
                    <th>Start Retest</th>
                </tr>
                </thead>
                <tbody>
                {retests.map((retest, idx) => {
                    return !retest ? null : (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{retest.testDate}</td>
                            <td>{retest.range}</td>
                            <td>{retest.testType}</td>
                            <td>
                                <button onClick={() => history.push({
                                    pathname: '/retests',
                                    state: {range: retest.range, testType: retest.testType}
                                })}>Take Retest
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </Container>
    )
}

export default Home
