import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function UserScorePerson(props) {
  const history = useHistory()

  const user = props.location.state.user
  const [exam, setExam] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .post(
        'exams/user-scores',
        { username: user.username },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((result) => {
        setExam(result.data)
      })
  }, [])

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>{user.name}'s Exam Result Page</h1>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {exam.map((quiz, idx) => {
            return (
              <Card key={idx}>
                {quiz.isRetest ? (
                  <Card.Header as="h5">
                    {quiz.date} <span style={{ color: 'red' }}>(RE-TEST)</span>
                  </Card.Header>
                ) : (
                  <Card.Header as="h5">{quiz.date}</Card.Header>
                )}
                <Card.Body>
                  <Card.Text>Level: {quiz.level}</Card.Text>
                  <Card.Text>Range: {quiz.range}</Card.Text>
                  <Card.Text>
                    Pass or Fail :{' '}
                    {quiz.isPass ? (
                      <span style={{ color: 'green' }}>Pass</span>
                    ) : (
                      <span style={{ color: 'red' }}>Fail</span>
                    )}
                  </Card.Text>
                  <Button
                    variant="info"
                    onClick={(event) => {
                      // go to question detail page
                      history.push({
                        pathname: '/user-scores/person/questions',
                        state: { exam: exam[idx], user: user },
                      })
                    }}
                  >
                    See Detail
                  </Button>
                </Card.Body>
              </Card>
            )
          })}
        </Col>
      </Row>
    </Container>
  )
}

export default UserScorePerson
