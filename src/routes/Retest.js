import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Container, Form, Table} from "react-bootstrap";
import Question from "../components/Question";

function Retest(props) {
    // init history
    const history = useHistory();

    // get props from history (from Test.js)
    const range = props.location.state.range;
    const testType = props.location.state.testType;

    // split range to get level, from, to
    const splitRange = range.split('_');
    const level = splitRange[0];
    const from = splitRange[1];
    const to = splitRange[2];


    // construct url
    const url = 'retests/questions?range=' + range + '&testType=' + testType

    // init states
    const [questions, setQuestions] = useState([]);
    const [myAnswers, setMyAnswers] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [questionNum, setQuestionNum] = useState([]);
    const [isMeaning, setIsMeaning] = useState([]);
    const [isCorrect, setIsCorrect] = useState([]) // isCorrect ? true : false
    const [originalQuestion, setOriginalQuestion] = useState([])
    const [submitButton, setSubmitButton] = useState(true)

    // get value from local storage
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(url, {headers: {Authorization: `Bearer ${token}`}})
            .then(result => {
                // check if retest questions exist
                if (result.data.length === 0) {
                    return;
                }
                setOriginalQuestion(result.data);

                let localQuestions = []
                let localAnswers = []
                let localQuestionNum = []
                let localIsMeaning = []

                for (let [i, question] of result.data.entries()) {
                    localQuestions[i] = question.question;
                    localAnswers[i] = question.answer
                    localQuestionNum[i] = question.question_num
                    localIsMeaning[i] = question.isMeaning
                }
                setQuestions(localQuestions)
                setAnswers(localAnswers)
                setQuestionNum(localQuestionNum)
                setIsMeaning(localIsMeaning)
            })
    }, [])


    const submitAnswers = async (event) => {
        event.preventDefault()
        checkVocabAnswers();

        let data = {
            testType,
            question_num: questionNum,
            questions,
            range: range,
            answer: answers,
            myAnswers,
            isMeaning,
            retest: true
        }

        setSubmitButton(false);

        await axios.post('response', data, {
            headers: {Authorization: `Bearer ${token}`},
        })
    }

    const checkVocabAnswers= () => {
        let tmpIsCorrect = []
        for (let i in answers) {
            let correctAnswer = answers[i]
            let myAnswer = myAnswers[i]

            tmpIsCorrect[i] = correctAnswer === myAnswer ? 'correct' : 'wrong'
        }
        setIsCorrect(tmpIsCorrect)
        // https://en.wikipedia.org/wiki/Levenshtein_distance
    }

    const handleChange = (event, index) => {
        let localAnswers = [...myAnswers]
        localAnswers[index] = event.target.value
        setMyAnswers(localAnswers);
    }

    return (
        <Container className="mt-4" fluid>
            <Col md={{span: 4, offset: 4}}>
                <h1>Re-Test</h1>
                <h3>Level: {level} </h3>
                <h3>Range: {from} - {to}</h3>
                <h3>Test Type: {testType}</h3>
            </Col>
            <Form onSubmit={submitAnswers}>
                <Form.Group>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Is Correct</th>
                        </tr>
                        </thead>
                        <tbody>
                        {originalQuestion.map((question, i) => (
                            <tr key={i}>
                                <td>{questionNum[i]}</td>
                                <td>{questions[i]}</td>
                                <td>
                                    <Form.Control
                                        type="text"
                                        placeholder="answer -> 모르면 x 적기"
                                        onChange={(event) => handleChange(event, i)}
                                        name={question.question_num}
                                        required
                                    />
                                </td>
                                <td>{isCorrect ? <span>{isCorrect[i]}</span> : null}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Form.Group>
                {submitButton ?
                    <Button type="submit" color="primary" size="lg">
                        Submit Re-Test
                    </Button>
                    :
                    <Button
                        onClick={(event) => history.push('/')}
                        size="lg"
                        color="success"
                        variant="success"
                    >
                        Home Page
                    </Button>
                }
            </Form>
        </Container>
    );
}

export default Retest