import axios from 'axios'
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
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
      <Form.Group controlId="level">
        <Form.Label>Level</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Level"
          onChange={(e) => setLevel(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="testDate">
        <Form.Label>Test Date</Form.Label>
        <Form.Control
          type="date"
          onChange={(e) => setTestDate(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="from">
        <Form.Label>From</Form.Label>
        <Form.Control
          type="number"
          placeholder="From: "
          onChange={(e) => setFrom(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="to">
        <Form.Label>To</Form.Label>
        <Form.Control
          type="number"
          placeholder="To: "
          onChange={(e) => setTo(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="questionType">
        <Form.Label>Question Type</Form.Label>
        <Form.Control
          type="text"
          placeholder="mixed | word | meaning "
          onChange={(e) => setQuestionType(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
  )
}

export default Plan
