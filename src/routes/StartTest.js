import React from "react";
import axios from "axios";
import Question from "../components/Question";
import { Form } from "react-bootstrap";

class StartTest extends React.Component {
  state = {
    questions: [],
    answers: [],
  };

  getQuestions = async () => {
    let questions = await axios.get("http://localhost:3000/testing?level=sp3");
    questions = questions.data;
    let level = questions[0].level;
    this.setState({ questions, level });
  };

  submitAnswers = async (event) => {
    event.preventDefault();
    // console.log(this.state.answers);
    let answers = this.state.answers;
    let level = this.state.level;
    let data = { answers, level };
    await axios.post("http://localhost:3000/testing/submitTest", data);
  };

  handleChange = (event, index) => {
    // let { answers } = this.state;
    // answers.push({ [event.target.name]: event.target.value });
    let answers = [...this.state.answers];
    answers[index] = { [event.target.name]: event.target.value };
    this.setState({ ...this.state, answers });
  };

  componentDidMount() {
    this.getQuestions();
  }

  render() {
    const { questions } = this.state;
    return (
      <form onSubmit={this.submitAnswers}>
        <Form.Group>
          {questions.map((question, i) => (
            <Question
              key={question.id}
              question_num={question.question_num}
              question={question.question}
              answer={question.answer}
              onChange={this.handleChange}
              index={i}
            />
          ))}
        </Form.Group>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default StartTest;
