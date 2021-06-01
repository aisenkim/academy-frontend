import React from "react";
import PropTypes from "prop-types";
import { Form, Col, Row } from "react-bootstrap";

function Question({ id, level, question_num, question, answer }) {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm={2}>
        {question_num}. {question}
      </Form.Label>
      <Col sm={10}>
        <Form.Control type="text" placeholder="answer" />
      </Col>
    </Form.Group>
  );
}

Question.propTypes = {
  id: PropTypes.string,
  level: PropTypes.string,
  question_num: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default Question;
