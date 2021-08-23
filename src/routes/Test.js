import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Container, Row, Col} from 'react-bootstrap'
import {Table} from 'react-bootstrap'
import {useHistory} from "react-router-dom";

function Test(props) {
    const history = useHistory();
    const [retests, setRetests] = useState([]);
    const [tests, setTests] = useState([]);

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

                    // grab plan that belongs to the user
                    const plans = await axios.get('plan', {
                        headers: {Authorization: `Bearer ${token}`},
                    })
                    setTests(plans.data);
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
                <Col md={{span: 2, offset: 0}}>
                    <h3>My Tests</h3>
                </Col>
            </Row>
            {/*Table for Tests (plans)*/}
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Test Date</th>
                    <th>Test Range</th>
                    <th>Test Type</th>
                    <th>Start Test</th>
                </tr>
                </thead>
                <tbody>
                {tests.map((plan, idx) => {
                    return !plan ? null : (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{plan.testDate}</td>
                            <td>{plan.level}_{plan.from}_{plan.to}</td>
                            <td>{plan.testType}</td>
                            <td>
                                <button onClick={() => history.push({
                                    pathname: '/startTest',
                                    state: {
                                        level: plan.level,
                                        from: plan.from,
                                        to: plan.to,
                                        testType: plan.testType,
                                        questionType: plan.questionType,
                                        retest: false
                                    }
                                })}>Take Test
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            {/* Table for Retests*/}
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
                                    // pathname: '/startTest',
                                    state: {range: retest.range, testType: retest.testType}
                                    // state: { level: retest.range.split("_")[0],
                                    //     from: retest.range.split("_")[1],
                                    //     to: retest.range.split("_")[2],
                                    //     testType: retest.testType,
                                    //     retest: true
                                    // }
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

export default Test
