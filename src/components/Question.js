import React from "react";
import PropTypes from "prop-types";
import { Form, Col, Row } from "react-bootstrap";

class Question extends React.Component {
  handleChange = (event) => {
    this.props.onChange(event, this.props.index);
  };
  render() {
    return (
      <Form.Group as={Row} controlId={this.props.question_num}>
        <Form.Label column sm={2}>
          {this.props.question_num}. {this.props.question}
        </Form.Label>
        <Col sm={5}>
          <Form.Control
            type="text"
            placeholder="answer -> 모르면 x 적기"
            onChange={this.handleChange}
            name={this.props.question_num}
            required
          />
        </Col>
        <Col sm={2}>
          {this.props.isCorrect ? <h1>{this.props.isCorrect}</h1> : null}
        </Col>
      </Form.Group>
    );
  }
}

// function Question({ id, level, question_num, question, answer, handleChange }) {
//   return (
//     <Form.Group as={Row} controlId={question_num}>
//       <Form.Label column sm={2}>
//         {question_num}. {question}
//       </Form.Label>
//       <Col sm={10}>
//         <Form.Control type="text" placeholder="answer" />
//       </Col>
//     </Form.Group>
//   );
// }

// Question.propTypes = {
//   id: PropTypes.string,
//   level: PropTypes.string,
//   question_num: PropTypes.number.isRequired,
//   question: PropTypes.string.isRequired,
//   answer: PropTypes.string.isRequired,
// };

export default Question;
