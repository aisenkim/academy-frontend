import {useHistory} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import React from "react";

function CreateUser() {
    // get history
    const history = useHistory();

    // init all states

    // onSubmit event listener
    const onSubmit = () => {

    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="level">
                <Form.Label>Create User</Form.Label>
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
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )

}