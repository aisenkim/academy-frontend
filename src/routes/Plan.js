import axios from 'axios'
import React from 'react'
import { Form, Button } from 'react-bootstrap'

export default class Plan extends React.Component {
  onSubmit = async (event) => {
    event.preventDefault()

    const data = {
      level: this.level,
      testDate: this.date,
      from: this.from,
      to: this.to,
      questionType: this.questionType,
    }

    try {
      const token = localStorage.getItem('token')
      await axios.post('admin/createPlan', data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="level">
          <Form.Label>Level</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Level"
            onChange={(e) => (this.level = e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="testDate">
          <Form.Label>Test Date</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => (this.date = e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="from">
          <Form.Label>From</Form.Label>
          <Form.Control
            type="number"
            placeholder="From: "
            onChange={(e) => (this.from = e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="to">
          <Form.Label>From</Form.Label>
          <Form.Control
            type="number"
            placeholder="To: "
            onChange={(e) => (this.to = e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="questionType">
          <Form.Label>Question Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="mixed | word | meaning "
            onChange={(e) => (this.questionType = e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      // <div>
      //   <form onSubmit={this.onSubmit}>
      //     <input
      //       name="level"
      //       type="text"
      //       placeholder="level"
      //       required
      //       onChange={(e) => (this.level = e.target.value)}
      //     />
      //     <input
      //       name="testDate"
      //       type="date"
      //       required
      //       onChange={(e) => (this.date = e.target.value)}
      //     />
      //     <input
      //       name="from"
      //       type="text"
      //       placeholder="from"
      //       required
      //       onChange={(e) => (this.from = e.target.value)}
      //     />
      //     <input
      //       name="to"
      //       type="text"
      //       placeholder="to"
      //       required
      //       onChange={(e) => (this.to = e.target.value)}
      //     />

      //     <input type="submit" value="Submit" />
      //   </form>
      // </div>
    )
  }
}
