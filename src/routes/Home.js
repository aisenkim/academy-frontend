import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Container, Jumbotron, Row, Col} from 'react-bootstrap'
import isAuthenticated from '../functions/authService'

function Home(props) {
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
        <Container className="mt-4" fluid>
            <Row>
                <Col md={{span: 3, offset: 4}}>
                    <h1>Welcome {props.appUser}!</h1>
                </Col>
            </Row>
            <Row>
                <Col md={{span: 2, offset: 4}}>
                    <h3>My Retest</h3>
                </Col>
            </Row>
            <Row>
                <Col md={{span: 2, offset: 4}}>
                    {props.appUser && userLevel === 'sp3' ? <h1>Test exist</h1> : null}
                </Col>
            </Row>
            {retests.map((retest, idx) => {
                return !retest ? null : (
                    <Row key={idx}>
                        <Col md={{span: 2, offset: 4}}>
                            <p>{retest.testDate}</p>
                        </Col>
                    </Row>
                )
            })}
        </Container>
    )
}

export default Home
