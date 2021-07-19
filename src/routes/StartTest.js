import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Question from '../components/Question'
import { Form, Container, Button, Dropdown } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function StartTest() {
  const history = useHistory()

  // init state
  // states for Vocab Test
  const [questions, setQuestions] = useState([]) // set either english or Korean
  const [myAnswers, setMyAnswers] = useState([]) // user's answers
  const [answers, setAnswers] = useState([])
  const [isCorrect, setIsCorrect] = useState([]) // isCorrect ? true : false
  const [questionNum, setQuestionNum] = useState([]) // Question number for each
  const [isMeaning, setIsMeaning] = useState([]) // isMeaning ? true : false
  const [originalQuestion, setOriginalQuestion] = useState([])

  // states for Sentence Test
  const [questionsSentence, setQuestionsSentence] = useState([]) // set either english or Korean
  const [myAnswersSentence, setMyAnswersSentence] = useState([]) // user's answers
  const [answersSentence, setAnswersSentence] = useState([])
  const [isCorrectSentence, setIsCorrectSentence] = useState([]) // isCorrect ? true : false
  const [questionNumSentence, setQuestionNumSentence] = useState([]) // Question number for each
  const [isMeaningSentence, setIsMeaningSentence] = useState([]) // isMeaning ? true : false
  const [originalQuestionSentence, setOriginalQuestionSentence] = useState([])

  // shows submit button at first and when submitted, hide submit button and show home page button
  const [showSubmitButtonVocab, setShowSubmitButtonVocab] = useState(true)
  const [showSubmitButtonSentence, setShowSubmitButtonSentence] = useState(true)

  // show and hide vocab test section
  const [showVocabTest, setShowVocabTest] = useState(false)
  const [vocabButtonText, setVocabButtonText] = useState('Start Vocab Test')

  // show and hide sentence test seciton
  const [showSentenceTest, setShowSentenceTest] = useState(false)
  const [sentenceButtonText, setSentenceButtonText] = useState(
    'Start Sentence Test',
  )

  // Get value from local storage
  const userLevel = localStorage.getItem('level')
  const token = localStorage.getItem('token')

  useEffect(() => {
    // request to get today's vocab question
    axios
      .get(`questions/todayQuestions?testType=word`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        // check if test exists
        if (result.data.length === 0) {
          setShowSubmitButtonVocab(false)
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

    // request to get today's sentence questions
    /**axios
      .get(`testing/getTodaySentenceQuestions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log(result)
        // check if test exists
        if (result.data.length === 0) {
          setShowSubmitButtonSentence(false)
          return
        }
        setOriginalQuestionSentence(result.data)
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
        setQuestionsSentence(localQuestions)
        setAnswersSentence(localAnswers)
        setQuestionNumSentence(localQuestionNum)
        setIsMeaningSentence(localIsMeanig)
      })*/
  }, [])

  const submitVocabAnswers = async (event) => {
    event.preventDefault()
    checkVocabAnswers()

    let range =
      userLevel +
      '_' +
      questionNum[0] +
      '_' +
      questionNum[questionNum.length - 1]

    let data = {
      testType: 'word',
      question_num: questionNum,
      questions,
      range: range,
      answer: answers,
      myAnswers,
      isMeaning,
    }
    // let data = { answers: myAnswers, level: userLevel, dateTime };
    await axios.post('response', data, {
      headers: { Authorization: `Bearer ${token}` },
    })

    setShowSubmitButtonVocab(false)
  }

  const submitSentenceAnswers = async (event) => {
    event.preventDefault()
    checkSentenceAnswers()

    let range =
      userLevel +
      '_' +
      questionNumSentence[0] +
      '_' +
      questionNumSentence[questionNumSentence.length - 1]

    let data = {
      testType: 'sentence',
      question_num: questionNumSentence,
      questions: questionsSentence,
      range: range,
      answer: answersSentence,
      myAnswers: myAnswersSentence,
      isMeaning: isMeaningSentence,
    }
    await axios.post('response', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    setShowSubmitButtonSentence(false)
  }

  /**
   * TODO - Answer Check Algorithm
   * Algorithm for checking if answer is correct
   * [THINK about handling it in the backend]
   * NEED TO FIX
   */
  const checkVocabAnswers = () => {
    let tmpIsCorrect = []
    for (let i in answers) {
      let correctAnswer = answers[i]
      let myAnswer = myAnswers[i]

      tmpIsCorrect[i] = correctAnswer === myAnswer ? 'correct' : 'wrong'
    }
    setIsCorrect(tmpIsCorrect)
    // https://en.wikipedia.org/wiki/Levenshtein_distance
  }

  const checkSentenceAnswers = () => {
    let tmpIsCorrect = []
    for (let i in answersSentence) {
      let correctAnswer = answersSentence[i]
      let myAnswer = myAnswersSentence[i]

      tmpIsCorrect[i] = correctAnswer === myAnswer ? 'correct' : 'wrong'
    }
    setIsCorrectSentence(tmpIsCorrect)
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

  const handleSentenceChange = (event, index) => {
    let localAnswers = [...myAnswersSentence]
    // CHECK -> later if I want to send data to backend to check , uncomment below and add data values
    // localAnswers[index] = {
    //   question_num: +event.target.name,
    //   answer: event.target.value,
    // };
    localAnswers[index] = event.target.value
    setMyAnswersSentence(localAnswers)
  }

  /**
   * Show and hide vocab test section on button press
   */
  const toggleVocabTest = () => {
    if (showVocabTest) {
      setShowVocabTest(false)
      setVocabButtonText('Start Vocab Test')
    } else {
      setShowVocabTest(true)
      setVocabButtonText('Hide Vocab Test')
    }
  }

  /**
   * Show and hide sentence test section on button press
   */
  const toggleSentenceTest = () => {
    if (showSentenceTest) {
      setShowSentenceTest(false)
      setSentenceButtonText('Start Sentence Test')
    } else {
      setShowSentenceTest(true)
      setSentenceButtonText('Hide Sentence Test')
    }
  }

  return (
    <Container>
      <Button onClick={toggleVocabTest} variant="warning">
        {vocabButtonText}
      </Button>
      <Button onClick={toggleSentenceTest} variant="info">
        {sentenceButtonText}
      </Button>
      {showVocabTest ? (
        <form onSubmit={submitVocabAnswers}>
          <Form.Group>
            <h1>Today's Vocab Test</h1>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Word Bank
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {answers.map((answer, i) => (
                  <Dropdown.Item key={i}>{answer}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
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
          {showSubmitButtonVocab ? (
            <Button name="wordBtn" type="submit" color="primary" size="lg">
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
      ) : null}
      {showSentenceTest ? (
        <form onSubmit={submitSentenceAnswers}>
          <Form.Group>
            <h1>Today's Sentence Test</h1>
            {originalQuestionSentence.map((question, i) => (
              <Question
                key={question.id}
                question_num={question.question_num}
                question={question.question}
                onChange={handleSentenceChange}
                isCorrect={isCorrectSentence[i]}
                index={i}
              />
            ))}
          </Form.Group>
          {showSubmitButtonSentence ? (
            <Button name="sentenceBtn" type="submit" color="primary" size="lg">
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
      ) : null}
    </Container>
  )
}

export default StartTest
