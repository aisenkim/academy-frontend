import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Question from '../components/Question'
import {Form, Container, Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

function StartTest() {
    const history = useHistory()

    // init state
    const [questions, setQuestions] = useState([]) // set either english or Korean
    const [myAnswers, setMyAnswers] = useState([]) // user's answers
    const [answers, setAnswers] = useState([])
    const [isCorrect, setIsCorrect] = useState([]) // isCorrect ? true : false
    const [questionNum, setQuestionNum] = useState([]) // Question number for each
    const [isMeaning, setIsMeaning] = useState([]) // isMeaning ? true : false
    const [originalQuestion, setOriginalQuestion] = useState([])

    // shows submit button at first and when submitted, hide submit button and show home page button
    const [showSubmitButton, setShowSubmitButton] = useState(true)

    // Get value from local storage
    const userLevel = localStorage.getItem('level')
    const token = localStorage.getItem('token')

    useEffect(() => {
        // request to get today's question
        axios
            .get(`testing/getTodayQuestions`, {
                headers: {Authorization: `Bearer ${token}`},
            })
            .then((result) => {
                // check if test exists
                if (result.data.length === 0) {
                    setShowSubmitButton(false)
                    return
                }
                setOriginalQuestion(result.data)
                let localQuestions = []
                let localAnswers = []
                let localQuestionNum = []
                let localIsMeanig = []

                for (let [i, question] of result.data.entries()) {
                    localQuestions[i] = question.question
                    localAnswers[i] = question.answer
                    localQuestionNum[i] = question.question_num
                    localIsMeanig[i] = question.isMeaning
                }
                setQuestions(localQuestions)
                setAnswers(localAnswers)
                setQuestionNum(localQuestionNum)
                setIsMeaning(localIsMeanig)
            })
    }, [])

    const submitAnswers = async (event) => {
        event.preventDefault()

        checkAnswers()

        let range =
            userLevel +
            '_' +
            questionNum[0] +
            '_' +
            questionNum[questionNum.length - 1]

        let data = {
            question_num: questionNum,
            questions,
            range: range,
            answer: answers,
            myAnswers,
            isMeaning,
        }
        // let data = { answers: myAnswers, level: userLevel, dateTime };
        await axios.post('testing/submitTest', data, {
            headers: {Authorization: `Bearer ${token}`},
        })

        setShowSubmitButton(false)
    }

    /**
     * TODO - Answer Check Algorithm
     * Algorithm for checking if answer is correct
     * [THINK about handling it in the backend]
     * NEED TO FIX
     */
    const checkAnswers = () => {
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
        // CHECK -> later if I want to send data to backend to check , uncomment below and add data values
        // localAnswers[index] = {
        //   question_num: +event.target.name,
        //   answer: event.target.value,
        // };
        localAnswers[index] = event.target.value
        setMyAnswers(localAnswers)
    }

    return (
        <Container>
            <form onSubmit={submitAnswers}>
                <Form.Group>
                    <h1>Today's Test</h1>
                    {originalQuestion.map((question, i) => (
                        <Question
                            key={question.id}
                            question_num={question.question_num}
                            question={question.question}
                            onChange={handleChange}
                            isCorrect={isCorrect[i]}
                            index={i}
                        />
                    ))}
                </Form.Group>
                {showSubmitButton ? (
                    <Button type="submit" color="primary" size="lg">
                        Submit
                    </Button>
                ) : (
                    <Button
                        onClick={(event) => history.push('/')}
                        size="lg"
                        color="success"
                        variant="success"
                    >
                        Home Page
                    </Button>
                )}
            </form>
        </Container>
    )
}

export default StartTest
