import React from 'react'
import axios from 'axios'
import Question from '../components/Question'
import { Form } from 'react-bootstrap'

class StartTest extends React.Component {
  state = {
    questions: [],
    answers: [],
  }

  getQuestions = async () => {
    const token = localStorage.getItem('token')
    let questions = await axios.get('testing?level=sp3', {
      headers: { Authorization: `Bearer ${token}` },
    })
    questions = questions.data
    let level = questions[0].level
    this.setState({ questions, level })
  }

  submitAnswers = async (event) => {
    event.preventDefault()
    // get current date and time
    const today = new Date()
    const date =
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    const time = today.getHours() + ':' + today.getMinutes()
    const dateTime = date + ' ' + time

    let answers = this.state.answers
    let level = this.state.level
    let data = { answers, level, dateTime }
    await axios.post('response', data)
  }

  handleChange = (event, index) => {
    // let { answers } = this.state;
    // answers.push({ [event.target.name]: event.target.value });
    let answers = [...this.state.answers]
    answers[index] = {
      question_num: +event.target.name,
      answer: event.target.value,
    }
    this.setState({ ...this.state, answers })
  }

  componentDidMount() {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("token"),
    //   },
    // };
    // const token = localStorage.getItem("token");
    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // axios
    // .get("auth/user", { headers: { Authorization: `Bearer ${token}` } })
    // .then(
    // (res) => console.log(res),
    // (err) => console.log(err)
    // );
    this.getQuestions()
  }

  render() {
    const { questions } = this.state
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
    )
  }
}

export default StartTest
