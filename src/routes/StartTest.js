import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "../components/Question";
import { Form, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function StartTest() {
  const history = useHistory();

  // init state
  const [questions, setQuestions] = useState([]); // set either english or Korean
  const [myAnswers, setMyAnswers] = useState([]); // user's answers
  const [answers, setAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState([]); // isCorrect ? true : false
  const [questionNum, setQuestionNum] = useState([]); // Question number for each
  const [isMeaning, setIsMeaning] = useState([]); // isMeaning ? true : false
  const [questionType, setQuestionType] = useState("mix");

  // shows submit button at first and when submitted, hide submit button and show home page button
  const [showSubmitButton, setShowSubmitButton] = useState(true);

  // Get value from local storage
  const userLevel = localStorage.getItem("level");
  const token = localStorage.getItem("token");

  // GET today's date
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const testDate = yyyy + "-" + mm + "-" + dd;

  useEffect(() => {
    axios
      .get(`testing/getPlan?level=${userLevel}&testDate=${testDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((plan) => {
        const planData = plan.data[0];
        return planData;
      })
      .then((planData) => {
        const { from, to, questionType } = planData;
        setQuestionType(questionType);
        getQuestions(from, to);
      })
      .catch((err) => {
        console.log(err);
      });

    async function getQuestions(from, to) {
      axios
        .get(`testing?level=${userLevel}&from=${from}&to=${to}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          setQuestions(result.data);
          let tmpQuestionNum = [];
          let tmpQuestionType = [];
          let tmpAnswers = [];

          for (let [index, question] of result.data.entries()) {
            tmpQuestionNum[index] = question.question_num;
            if (questionType === "word") {
              tmpQuestionType[index] = 0;
              tmpAnswers[index] = question.answer; // answer must be meaning
            } else if (questionType === "meaning") {
              tmpQuestionType[index] = 1;
              tmpAnswers[index] = question.question; // answer must be meaning
            } else {
              const randomNum = Math.round(Math.random());
              tmpQuestionType[index] = randomNum;
              randomNum == 0
                ? (tmpAnswers[index] = question.answer)
                : (tmpAnswers[index] = question.question);
            }
          }

          setQuestionNum(tmpQuestionNum);
          setIsMeaning(tmpQuestionType);
          setAnswers(tmpAnswers);
        });
    }
  }, []);

  const submitAnswers = async (event) => {
    event.preventDefault();
    // get current date and time
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time = today.getHours() + ":" + today.getMinutes();
    const dateTime = date + " " + time;

    checkAnswers();

    let range =
      userLevel +
      "_" +
      questionNum[0] +
      "_" +
      questionNum[questionNum.length - 1];

    let data = {
      question_num: questionNum,
      range: range,
      date: dateTime,
      level: userLevel,
      answer: answers,
      myAnswers,
      isCorrect,
      isMeaning,
    };
    // let data = { answers: myAnswers, level: userLevel, dateTime };
    await axios.post("testing/submitTest", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setShowSubmitButton(false);

    // TODO - show if questions are correct or not
    // TODO - hide submit button and show button that redirects to homepage
  };

  /**
   * Algorithm for checking if answer is correct
   * [THINK about handling it in the backend]
   * NEED TO FIX
   */
  const checkAnswers = () => {
    let tmpIsCorrect = [];
    for (let i in answers) {
      let correctAnswer = answers[i];
      let myAnswer = myAnswers[i];

      tmpIsCorrect[i] = correctAnswer === myAnswer ? "correct" : "wrong";
    }
    setIsCorrect(tmpIsCorrect);
    // https://en.wikipedia.org/wiki/Levenshtein_distance
  };

  const handleChange = (event, index) => {
    let localAnswers = [...myAnswers];
    // CHECK -> later if I want to send data to backend to check , uncomment below and add data values
    // localAnswers[index] = {
    //   question_num: +event.target.name,
    //   answer: event.target.value,
    // };
    localAnswers[index] = event.target.value;
    setMyAnswers(localAnswers);
  };

  // const goHome = (event) => {

  // }

  return (
    <Container>
      <form onSubmit={submitAnswers}>
        <Form.Group>
          <h1>Today's Test</h1>
          {questions.map((question, i) => (
            <Question
              key={question.id}
              question_num={question.question_num}
              question={isMeaning[i] ? question.answer : question.question}
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
        ) : null}
      </form>

      {showSubmitButton ? null : (
        <Button
          onClick={(event) => history.push("/")}
          size="lg"
          color="success"
          variant="success"
        >
          Home Page
        </Button>
      )}
    </Container>
  );
}

export default StartTest;
