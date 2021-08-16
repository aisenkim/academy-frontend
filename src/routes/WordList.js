import {useHistory} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";
import {Button, Container, Form} from "react-bootstrap";
import levels from "../files/levels.json";
import React, {useState} from "react";
import WordTable from "../components/WordTable";

function WordList() {
    // history
    const history = useHistory();

    // token
    const token = localStorage.getItem("token");

    // logged in user's role
    const role = localStorage.getItem("role");

    // logged in user's level
    const level = localStorage.getItem("level");

    // react-hook-form
    const {register, handleSubmit} = useForm();

    // state
    const [wordList, setWordList] = useState([]);

    // click event listener
    const onSubmit = async (data) => {
        // not admin and selected level that person isn't in
        if (role !== 'admin' && level !== data.level) {
            alert("You can only view words from your level");
            return;
        }

        try {
            if (data.testType === "word") {
                const words = await axios.get(`questions/${level}`, {
                    headers: {Authorization: `Bearer ${token}`},
                })
                setWordList(words.data);
            } else {
                const sentence = await axios.get(`sentence/${level}`, {
                    headers: {Authorization: `Bearer ${token}`},
                })
                setWordList(sentence.data);
            }
        } catch (error) {
            alert("Create User Failed");
        }

    }

    return (
        <Container className="mt-4">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Test Type</Form.Label>
                    <Form.Control as="select" {...register("testType", {required: true})} >
                        <option>word</option>
                        <option>sentence</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Level</Form.Label>
                    <Form.Control as="select" {...register("level")}>
                        {levels.levels.map((item, idx) => {
                            return <option key={idx}>{item}</option>
                        })}
                    </Form.Control>
                </Form.Group>
                <Button variant="success" type="submit">
                    Get Word List
                </Button>
            </Form>

            {wordList.length > 0 ?
                (
                    <>
                        <h1>- Word List -</h1>
                        <WordTable
                            wordList={wordList}
                        />
                    </>
                )
                :
                null
            }
        </Container>
    )

}

export default WordList