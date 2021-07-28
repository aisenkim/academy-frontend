import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container} from "react-bootstrap";
import Question from "../components/Question";

function Retest(props) {
    // init history
    const history = useHistory();

    // get props from history (from Home.js)
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

    // get value from local storage
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(url, {headers: {Authorization: `Bearer ${token}`}})
            .then(result => {
                // check if retest questions exist
                if (result.data.length === 0) {
                    console.log("Empty data passed");
                }
                setQuestions(result.data);

                let localAnswers = []
                let localQuestionNum = []
                let localIsMeaning = []

                for (let [i, question] of result.data.entries()) {
                    localAnswers[i] = question.answer
                    localQuestionNum[i] = question.question_num
                    localIsMeaning[i] = question.isMeaning
                }
                setAnswers(localAnswers)
                setQuestionNum(localQuestionNum)
                setIsMeaning(localIsMeaning)
            })
    }, [])


    const  submitAnswers = async (event) => {
        event.preventDefault()

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

        await axios.post('response', data, {
            headers: {Authorization: `Bearer ${token}`},
        })
        history.push('/')
    }

    const handleChange = (event, index) => {
        let localAnswers = [...myAnswers]
        localAnswers[index] = event.target.value
        setMyAnswers(localAnswers);
    }

    return (
        <Container>
            <h1>Re-Test</h1>
            <h3>Level: {level} </h3>
            <h3>Range: {from} - {to}</h3>
            <h3>Test Type: {testType}</h3>
            <form onSubmit={submitAnswers}>
                {questions.map((question, i) => (
                    <Question
                        key={question.id}
                        question_num={question.question_num}
                        question={question.question}
                        onChange={handleChange}
                        index={i}
                    />
                ))}
                <Button type="submit" color="primary" size="lg">
                    Submit Re-Test
                </Button>
            </form>
        </Container>
    );
}

export default Retest