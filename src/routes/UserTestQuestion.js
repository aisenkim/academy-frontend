import {useEffect, useState} from 'react'
import axios from 'axios'
import {Container, Card, Row, Col, ListGroup, Button} from 'react-bootstrap'
import {useHistory} from "react-router-dom";

function UserTestQuestion(props) {
    const history = useHistory();

    const exam = props.location.state.exam
    const user = props.location.state.user

    const token = localStorage.getItem('token');

    // compare function for sorting examQuestion
    const compare = (examQuestion1, examQuestion2) => {
        if (examQuestion1.question_num < examQuestion2.question_num) {
            return -1;
        } else if (examQuestion1.question_num > examQuestion2.question_num) {
            return 1;
        }
        return 0;
    }

    // array of objects containing student's answers for each question (word || sentence)
    // setting it depending on the type of test
    let examQuestions
    exam.testType === 'word'
        ? (examQuestions = exam.examQuestion)
        : (examQuestions = exam.sentenceResponses)

    // sort examQuestion
    examQuestions.sort(compare);

    const [questionAnswer, setQuestionAnswer] = useState([])

    useEffect(() => {
        const range = exam.range.split('_') // level_from_to
        const level = exam.level
        const from = range[1]
        const to = range[2]
        const testType = exam.testType // if it's vocab question or sentence question
        let questionsOrSentence

        testType === 'word'
            ? (questionsOrSentence = 'questions')
            : (questionsOrSentence = 'sentence')

        axios
            .get(
                `${questionsOrSentence}?level=${level}&from=${from}&to=${to}&testType=${testType}`,
                {
                    headers: {Authorization: `Bearer ${token}`},
                },
            )
            .then((result) => {
                setQuestionAnswer(result.data)
            })
    }, [])

    // data - object containing info
    const editIsCorrect = async (data) => {
        const questionId = data.id;
        await axios.patch(`response/${questionId}`, {...data, testType: exam.testType, examId: exam.id, range: exam.range}, {
            headers: {Authorization: `Bearer ${token}`},
        })
            .then((response) => {
                // success - redirect to homepage
                // history.go(0);
                history.push('../');
            })
            .catch((err) => {
                alert("Not able to change answers at the moment. Try again later!");
            });
    }

    return (
        <Container className="mt-4" fluid>
            <Row>
                <Col md={{span: 6, offset: 4}}>
                    <h1>
                        {user.name}'s {exam.date} exam
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col md={{span: 6, offset: 4}}>
                    <h2>Exam Average: {exam.average}%</h2>
                </Col>
            </Row>
            <Row>
                <Col md={{span: 6, offset: 4}}>
                    <ListGroup className="mt-2">
                        {questionAnswer.map((answer, idx) => {
                            return !answer ? null : (
                                <Card key={idx}>
                                    {examQuestions[idx].isCorrect ? (
                                        <Card.Header as="h3" style={{color: 'green'}}>
                                            {examQuestions[idx].question_num}
                                            <Button variant='danger' className='float-end' onClick={() => {
                                                // correct => change to wrong
                                                editIsCorrect({
                                                    id: examQuestions[idx].id,
                                                    isCorrect: !examQuestions[idx].isCorrect
                                                });
                                            }}>Set Wrong</Button>
                                        </Card.Header>
                                    ) : (
                                        <Card.Header as="h3" style={{color: 'red'}}>
                                            {examQuestions[idx].question_num}
                                            <Button variant='success' className='float-end' onClick={() => {
                                                // wrong => change to correct
                                                editIsCorrect({
                                                    id: examQuestions[idx].id,
                                                    isCorrect: !examQuestions[idx].isCorrect
                                                })
                                            }}>Set Correct</Button>
                                        </Card.Header>
                                    )}
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
                            )
                        })}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default UserTestQuestion
