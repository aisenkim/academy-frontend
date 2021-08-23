import axios from 'axios'
import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function Plan() {
  const history = useHistory()

  const [testType, setTestType] = useState('')
  const [level, setLevel] = useState('')
  const [testDate, setTestDate] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [questionType, setQuestionType] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    // const data = {
    //     testType: this.testType,
    //     level: this.level,
    //     testDate: this.date,
    //     from: this.from,
    //     to: this.to,
    //     questionType: this.questionType,
    // }
    const data = { testType, level, testDate, from, to, questionType }

    try {
      const token = localStorage.getItem('token')
      await axios.post('plan/createPlan', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      history.push("/");
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <Container className="mt-4 fluid">
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="level">
            <Form.Label>Test Type</Form.Label>
            <br />
            <select onChange={(e) => setTestType(e.target.value)} required>
              <option>Select Test Type...</option>
              <option value="word">Word Questions</option>
              <option value="sentence">Sentence Questions</option>
            </select>
          </Form.Group>
            <br/>
          <Form.Group controlId="level">
            <Form.Label>Level</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Level"
              onChange={(e) => setLevel(e.target.value)}
            />
          </Form.Group>
            <br/>
          <Form.Group controlId="testDate">
            <Form.Label>Test Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setTestDate(e.target.value)}
            />
          </Form.Group>
            <br/>
          <Form.Group controlId="from">
            <Form.Label>From</Form.Label>
            <Form.Control
              type="number"
              placeholder="From: "
              onChange={(e) => setFrom(e.target.value)}
            />
          </Form.Group>
            <br/>
          <Form.Group controlId="to">
            <Form.Label>To</Form.Label>
            <Form.Control
              type="number"
              placeholder="To: "
              onChange={(e) => setTo(e.target.value)}
            />
          </Form.Group>
            <br/>
          <Form.Group controlId="questionType">
            <Form.Label>Question Type</Form.Label>
            {/*<Form.Control*/}
            {/*  type="text"*/}
            {/*  placeholder="mixed | word | meaning "*/}
            {/*  onChange={(e) => setQuestionType(e.target.value)}*/}
            {/*/>*/}
              <br/>
              <select onChange={(e) =>setQuestionType(e.target.value)} required>
                  <option>Select Question Type...</option>
                  <option value="word">Word Questions (한영시험)</option>
                  <option value="meaning">Meaning Questions(영한시험)</option>
                  <option value="meaning">Mixed Questions(랜덤)</option>
              </select>
          </Form.Group>
            <br/>
          <Button variant="primary" type="submit" >
            Submit
          </Button>
        </Form>
      </Container>
  )
}

export default Plan
