import React from "react";
import axios from "axios";
import Question from "../components/Question";
import { Form } from "react-bootstrap";

class StartTest extends React.Component {
  state = {
    questions: [],
  };

  getQuestions = async () => {
    let questions = await axios.get("http://localhost:3000/testing?level=sp3");
    questions = questions.data;
    this.setState({ questions });
  };

  componentDidMount() {
    this.getQuestions();
  }

  render() {
    const { questions } = this.state;
    return (
      <Form.Group>
        {questions.map((question) => (
          <Question
            key={question.id}
            question_num={question.question_num}
            question={question.question}
            answer={question.answer}
          />
        ))}
      </Form.Group>
    );
  }
}

export default StartTest;
