import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Container, Jumbotron, Row, Col} from 'react-bootstrap'
import {Table} from 'react-bootstrap'
import isAuthenticated from '../functions/authService'
import {useHistory} from "react-router-dom";

function Home(props) {
    const history = useHistory();
    // const [from, setFrom] = useState("");
    // const [to, setTo] = useState("");
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
                const retest = await axios.get('retests', {
                    headers: {Authorization: `Bearer ${token}`},
                })
                console.log(retest.data)
                setRetests(retest.data);
            } catch (err) {
                console.log(err);
            }
        }

        getRetest()
    }, []);


    // useEffect(() => {
    //   async function getPlan() {
    //     try {
    //       const plan = await axios.get(
    //         `plan/getPlan?level=${userLevel}&testDate=${testDate}`,
    //         { headers: { Authorization: `Bearer ${token}` } },
    //       )
    //       // extract "from" and "to" from plan
    //       console.log(plan)
    //       const planData = plan.data[0]
    //       const { from, to } = planData
    //       // setFrom(from);
    //       // setTo(to);
    //       // make request to get test data
    //     } catch (error) {
    //       if (!isAuthenticated()) {
    //         props.setAppToken('')
    //         props.setAppUser('')
    //       }
    //       console.log(error)
    //     }
    //   }
    //   getPlan()
    // }, [])

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
        // <Container className="mt-4" fluid>
        //     <Row>
        //         <Col md={{span: 3, offset: 4}}>
        //             <h1>Welcome {props.appUser}!</h1>
        //         </Col>
        //     </Row>
        //     <Row>
        //         <Col md={{span: 2, offset: 4}}>
        //             <h3>My Retest</h3>
        //         </Col>
        //     </Row>
        //     <Row>
        //         <Col md={{span: 2, offset: 4}}>
        //             {props.appUser && userLevel === 'sp3' ? <h1>Test exist</h1> : null}
        //         </Col>
        //     </Row>
        //     {retests.map((retest, idx) => {
        //         return !retest ? null : (
        //             <Row key={idx}>
        //                 <Col md={{span: 2, offset: 4}}>
        //                     <p>{retest.testDate}</p>
        //                 </Col>
        //                 <Col md={{span: 2, offset: 0}}>
        //                     <p>{retest.range}</p>
        //                 </Col>
        //             </Row>
        //         )
        //     })}
        // </Container>
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
