import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, ListGroup } from "react-bootstrap";
import { useRef } from "react";

function UserTestQuestion(props) {
  const exam = props.location.state.exam;
  const user = props.location.state.user;
  const examQuestions = exam.examQuestion; // array of objects containing student's answers for each question 

  const [questionAnswer, setQuestionAnswer] = useState([]);

  useEffect(() => {
    const range = exam.range.split("_"); // level_from_to
    const level = range[0];
    const from = range[1];
    const to = range[2];
    const token = localStorage.getItem("token");

    examQuestions.reverse() // question in opposite order 

    axios
      .get(`testing?level=${level}&from=${from}&to=${to}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setQuestionAnswer(result.data);
      });
  }, []);

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col md={{ span: 6, offset: 4 }}>
    <h1>{user.name}'s {exam.date} exam</h1>
    </Col>
    </Row>
    <Row>
        <Col md={{ span: 6, offset: 4 }}>
    <h2>Exam Average: {exam.average}%</h2>
    </Col>
    </Row>
    <Row>
        <Col md={{ span: 6, offset: 4 }}>
          <ListGroup className="mt-2">
      {questionAnswer.map((answer, idx) => {
        return !answer ? null : (
          <Card key={idx}>
            {
            examQuestions[idx].isCorrect ? <Card.Header as="h3" style={{color: 'green'}}>{examQuestions[idx].question_num}</Card.Header> : 
            <Card.Header as="h3" style={{color: 'red'}}>{examQuestions[idx].question_num}</Card.Header>
            }
            <Card.Body>
              <Card.Text>
                Question:
                {examQuestions[idx].isMeaning
                  ? answer.question
                  : answer.answer}
              </Card.Text>
              <Card.Text>
                Answer:
                {examQuestions[idx].isMeaning
                  ? answer.answer
                  : answer.question}
              </Card.Text>
              <Card.Text>
                Student's Answer:
                {examQuestions[idx].answer}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
      </ListGroup>
      </Col>
      </Row>
    </Container>
  );
}

export default UserTestQuestion;
