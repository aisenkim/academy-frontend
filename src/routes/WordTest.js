// level , from , to , testType

import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";

function WordTest(props) {
    // init history
    const history = useHistory();

    // token from local storage
    const token = localStorage.getItem('token');

    // get props from history
    const {level, from, to, testType, questionType, retest} = props.location.state;

    // determine which table to get questions from
    let questionsOrSentence = testType === "word" ? "questions" : "sentence";

    // construct url
    const url = `${questionsOrSentence}?level=${level}&from=${from}&to=${to}&testType=${testType}`;

    // init states
    const [questions, setQuestions] = useState([]) // set either english or Korean
    const [myAnswers, setMyAnswers] = useState([]) // user's answers
    const [answers, setAnswers] = useState([])
    const [isCorrect, setIsCorrect] = useState([]) // isCorrect ? true : false
    const [questionNum, setQuestionNum] = useState([]) // Question number for each
    const [isMeaning, setIsMeaning] = useState([]) // isMeaning ? true : false
    const [originalQuestion, setOriginalQuestion] = useState([])
    const [submitButton, setSubmitButton] = useState(true)


    useEffect(() => {
        axios.get(url, {
            headers: {Authorization: `Bearer ${token}`},
        })
            .then((result) => {
                if (result.data.length === 0)
                    return;

                setOriginalQuestion(result.data);

                let localQuestions = []
                let localAnswers = []
                let localQuestionNum = []
                let localIsMeaning = []

                let isMeaning;

                // assigning question and answer based on the question type
                for (let [i, question] of result.data.entries()) {
                    // need to swap [word and sentence] when question type is word
                    if (questionType === "word") {
                        isMeaning = false;
                        localQuestions[i] = question.answer;
                        localAnswers[i] = question.question;
                    } else if (questionType === "meaning") {
                        isMeaning = true;
                        localQuestions[i] = question.question
                        localAnswers[i] = question.answer
                    } else {
                        // randomly mix it
                        isMeaning = !!Math.round(Math.random());
                        if (!isMeaning) {
                            localQuestions[i] = question.answer;
                            localAnswers[i] = question.question;
                        }
                    }
                    localQuestionNum[i] = question.question_num
                    localIsMeaning[i] = isMeaning
                }

                // mix the localAnswers -> word bank list words in different order
                // TODO


                setQuestions(localQuestions)
                setAnswers(localAnswers)
                setQuestionNum(localQuestionNum)
                setIsMeaning(localIsMeaning)

            })
    }, []);


    const submitAnswers = async (event) => {
        event.preventDefault()
        checkVocabAnswers()

        let range = `${level}_${from}_${to}`;

        let data = {
            testType,
            question_num: questionNum,
            questions,
            range: range,
            answer: answers,
            myAnswers,
            isMeaning,
            retest
        }

        await axios.post('response', data, {
            headers: {Authorization: `Bearer ${token}`},
        })
        setSubmitButton(false);
    }

    /**
     * TODO - Answer Check Algorithm
     * Algorithm for checking if answer is correct
     * Another answer check happens in the backend [in case altered by user]
     */
    const checkVocabAnswers = () => {
        let tmpIsCorrect = []
        for (let i in answers) {
            let correctAnswers = answers[i]
                .toUpperCase()
                .replace(/\s/g, "")
                .split(",");
            let myAnswer = myAnswers[i].toUpperCase().replace(/\s/g, "");

            for (let answer of correctAnswers) {
                if (answer === myAnswer) {
                    tmpIsCorrect[i] = 'correct';
                    break;
                } else {
                    tmpIsCorrect[i] = 'wrong';
                }
            }
            // tmpIsCorrect[i] = correctAnswers === myAnswer ? 'correct' : 'wrong'
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
            <Row>
                <Col md={{span: 4, offset: 4}}>
                    <h1>Level: {level} From: {from} To: {to}</h1>
                </Col>
            </Row>
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
                    <Button name="wordBtn" type="submit" color="primary" size="lg">
                        Submit
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

    )

}

export default WordTest;